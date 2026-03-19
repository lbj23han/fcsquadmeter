import { SEARCH_LABELS } from "@/constants/search";
import {
  SEARCH_FORM,
  SEARCH_INPUT,
  SEARCH_BUTTON,
  SEARCH_ERROR,
  SEARCH_HINT,
} from "@/styles/search";

type Props = {
  value: string;
  errorMessage: string | null;
  onChange: (value: string) => void;
  onSubmit: (value: string) => void;
  isPending: boolean;
};

export function SearchFormView({ value, errorMessage, onChange, onSubmit, isPending }: Props) {
  return (
    <div>
      <form
        className={SEARCH_FORM}
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(value);
        }}
      >
        <input
          className={SEARCH_INPUT}
          placeholder={SEARCH_LABELS.placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={isPending}
        />
        <button type="submit" className={SEARCH_BUTTON} disabled={isPending}>
          {isPending ? (
            <span className="inline-flex items-center gap-2">
              <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-zinc-400 border-t-zinc-100" />
              비교 중...
            </span>
          ) : (
            SEARCH_LABELS.submit
          )}
        </button>
      </form>

      {errorMessage ? (
        <p className={SEARCH_ERROR}>{errorMessage}</p>
      ) : (
        <p className={SEARCH_HINT}>{SEARCH_LABELS.hint}</p>
      )}
    </div>
  );
}
