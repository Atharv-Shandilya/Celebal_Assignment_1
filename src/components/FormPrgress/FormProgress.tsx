import FormProgressStep from "./FormProgressStep";

export default ({ pageNumber }: { pageNumber: number }) => {
  return (
    <header className="flex justify-center gap-2 mb-[50px]">
      <FormProgressStep
        count={1}
        pageNumber={pageNumber}
        label="basic details"
        isNext
      />
      <FormProgressStep
        count={2}
        pageNumber={pageNumber}
        label="contact details"
        isNext
      />
      <FormProgressStep
        count={3}
        pageNumber={pageNumber}
        label="submitted"
        isNext={false}
      />
    </header>
  );
};
