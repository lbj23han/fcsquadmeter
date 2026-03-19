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
};

export function SearchFormView({ value, errorMessage, onChange, onSubmit }: Props) {
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
        />
        <button type="submit" className={SEARCH_BUTTON}>
          {SEARCH_LABELS.submit}
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
