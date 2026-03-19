"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { buildSearchVM } from "./model";
import { SearchFormView } from "./SearchFormView";

type Props = {
  defaultValue: string;
};

export function SearchForm({ defaultValue }: Props) {
  const router = useRouter();
  const [value, setValue] = useState(defaultValue);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  function handleSubmit(raw: string) {
    const vm = buildSearchVM(raw);

    if (!vm.isValid) {
      setErrorMessage(vm.errorMessage);
      return;
    }

    setErrorMessage(null);
    router.push(`/?nicknames=${vm.nicknames.join(",")}`);
  }

  return (
    <SearchFormView
      value={value}
      errorMessage={errorMessage}
      onChange={setValue}
      onSubmit={handleSubmit}
    />
  );
}
