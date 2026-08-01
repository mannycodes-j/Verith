"use client";

import { Check, Plus, Trash2 } from "lucide-react";
import { createBlankQuestion } from "@/data/admin-content";
import type { EditorialQuestion, QuestionType } from "@/types/admin-content";

const panel = "full grid gap-4 rounded-3xl border border-white/[0.08] bg-white/[0.025] p-4 md:p-6";
const smallButton = "inline-flex min-h-10 w-fit items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 text-xs font-semibold text-white/70 transition hover:bg-white/[0.08]";

export default function QuestionBuilder({ questions, onChange }: { questions: EditorialQuestion[]; onChange: (questions: EditorialQuestion[]) => void }) {
  const update = (index: number, value: EditorialQuestion) => onChange(questions.map((item, itemIndex) => itemIndex === index ? value : item));
  const nextQuestionIndex = Math.max(0, ...questions.map((question) => Number.parseInt(question.id.match(/\d+$/)?.[0] ?? "0", 10)));
  return (
    <fieldset className="full grid min-w-0 gap-4 border-0 p-0">
      <div className="flex items-end justify-between gap-4">
        <div><legend className="text-sm font-semibold text-white">Questions and answers</legend><p className="mt-1 text-xs leading-5 text-white/45">Write the question, add possible answers, then mark the answer learners should choose.</p></div>
        <button className={smallButton} onClick={() => onChange([...questions, createBlankQuestion(nextQuestionIndex)])} type="button"><Plus size={14} /> Add question</button>
      </div>
      {questions.map((question, questionIndex) => (
        <section className={panel} key={question.id}>
          <header className="flex items-center justify-between gap-3"><strong className="text-sm text-violet-300">Question {questionIndex + 1}</strong>{questions.length > 1 && <button aria-label={`Remove question ${questionIndex + 1}`} className="grid size-10 place-items-center rounded-full border border-red-400/15 bg-red-400/[0.05] text-red-300" onClick={() => onChange(questions.filter((_, index) => index !== questionIndex))} type="button"><Trash2 size={15} /></button>}</header>
          <label className="full">Question prompt<textarea maxLength={2000} minLength={3} onChange={(event) => update(questionIndex, { ...question, prompt: event.target.value })} placeholder="What should the learner decide?" required value={question.prompt} /></label>
          <label>Answer style<select onChange={(event) => { const type = event.target.value as QuestionType; update(questionIndex, { ...question, type, correctOptionIds: type === "SINGLE_CHOICE" ? question.correctOptionIds.slice(0, 1) : question.correctOptionIds }); }} value={question.type}><option value="SINGLE_CHOICE">One correct answer</option><option value="MULTIPLE_CHOICE">More than one correct answer</option></select></label>
          <div className="full grid gap-3">
            <span className="text-xs font-semibold text-white/70">Answer choices</span>
            {question.options.map((option, optionIndex) => {
              const selected = question.correctOptionIds.includes(option.id);
              return <div className="grid grid-cols-[auto_1fr_auto] items-center gap-3" key={option.id}>
                <button aria-label={`Mark answer ${optionIndex + 1} as correct`} aria-pressed={selected} className={`grid size-10 place-items-center rounded-full border transition ${selected ? "border-emerald-400/35 bg-emerald-400/10 text-emerald-300" : "border-white/10 bg-white/[0.03] text-white/25"}`} onClick={() => { const correctOptionIds = question.type === "SINGLE_CHOICE" ? [option.id] : selected ? question.correctOptionIds.filter((id) => id !== option.id) : [...question.correctOptionIds, option.id]; update(questionIndex, { ...question, correctOptionIds }); }} type="button"><Check size={15} /></button>
                <input aria-label={`Answer ${optionIndex + 1}`} maxLength={500} minLength={1} onChange={(event) => update(questionIndex, { ...question, options: question.options.map((item, index) => index === optionIndex ? { ...item, text: event.target.value } : item) })} placeholder={`Answer ${optionIndex + 1}`} required value={option.text} />
                {question.options.length > 2 && <button aria-label={`Remove answer ${optionIndex + 1}`} className="grid size-10 place-items-center rounded-full text-white/35 hover:bg-white/[0.05] hover:text-red-300" onClick={() => update(questionIndex, { ...question, options: question.options.filter((_, index) => index !== optionIndex), correctOptionIds: question.correctOptionIds.filter((id) => id !== option.id) })} type="button"><Trash2 size={14} /></button>}
              </div>;
            })}
            {question.options.length < 10 && <button className={smallButton} onClick={() => { const optionNumber = Math.max(0, ...question.options.map((option) => Number.parseInt(option.id.match(/\d+$/)?.[0] ?? "0", 10))) + 1; update(questionIndex, { ...question, options: [...question.options, { id: `${question.id}-option-${optionNumber}`, text: "" }] }); }} type="button"><Plus size={14} /> Add answer</button>}
          </div>
          <label className="full">Why this answer is correct<textarea maxLength={2000} minLength={3} onChange={(event) => update(questionIndex, { ...question, explanation: event.target.value })} placeholder="Give the learner a short evidence-based explanation." required value={question.explanation} /></label>
        </section>
      ))}
    </fieldset>
  );
}
