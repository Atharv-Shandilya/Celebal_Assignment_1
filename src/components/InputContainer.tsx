import type { ReactNode } from "react";

export default ({ children }: { children: ReactNode }) => {
  return (
    <section className="flex gap-4 flex-col md:flex-row mb-5">
      {children}
    </section>
  );
};
