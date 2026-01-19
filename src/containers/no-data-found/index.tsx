import noDataFoundIcon from "@assets/img/not-found-icon.svg";

export const NoDataFound = () => {
  return (
    <div className="flex flex-col items-center gap-6 pt-14">
      <img
        src={noDataFoundIcon}
        aria-hidden="true"
        className="sm:w-[156px]"
      />

      <div className="flex flex-col items-center gap-4 text-center">
        <h2 className="text-primary text-2xl font-bold sm:w-[650px]">
          Sorry, we couldn’t find any results matching your search.
        </h2>

        <p className="text-platinum-silver text-2xl font-light">
          Please try again with different keywords or filters.
        </p>
      </div>
    </div>
  );
};
