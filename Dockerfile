FROM node:24-alpine AS dependencies
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM dependencies AS build
ARG BACKEND_API_URL=http://localhost:4000
ENV BACKEND_API_URL=$BACKEND_API_URL
ENV NEXT_TELEMETRY_DISABLED=1
COPY . .
RUN npm run build

FROM node:24-alpine AS production
ARG VCS_REF=unknown
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV HOSTNAME=0.0.0.0
ENV PORT=3000
WORKDIR /app
LABEL org.opencontainers.image.title="Verith Frontend" \
  org.opencontainers.image.description="Verith Next.js web application" \
  org.opencontainers.image.revision=$VCS_REF
RUN addgroup -S verith && adduser -S verith -G verith
COPY --from=build --chown=verith:verith /app/.next/standalone ./
COPY --from=build --chown=verith:verith /app/.next/static ./.next/static
COPY --from=build --chown=verith:verith /app/public ./public
USER verith
EXPOSE 3000
STOPSIGNAL SIGTERM
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:3000/').then(r=>{if(!r.ok)process.exit(1)}).catch(()=>process.exit(1))"
CMD ["node", "server.js"]
