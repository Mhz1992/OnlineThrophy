type ListData = {
    title: string;
    value: string;
};

type RankedListClassName = {
    container: string;
    listItem: string;
    separator: string;
};

type RankedListProps = {
    data: ListData[];
    classNames?: Partial<RankedListClassName>;
};
