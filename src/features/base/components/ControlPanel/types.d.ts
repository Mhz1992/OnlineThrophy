declare namespace ControlPanel {
    type ContainerProps = {
        children?: React.ReactNode;
    };

    type PanelProps = ContainerProps & {
        hidden?: boolean;
        className?: string;
    };
}
