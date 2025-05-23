'use client';

import React, {Component, JSX, ReactNode} from 'react';
import { toast } from 'sonner';

type UniversalErrorBoundaryProps = {
    fallback: ReactNode;
    children: ReactNode;
};

type UniversalErrorBoundaryState = {
    hasError: boolean;
};

class UniversalErrorBoundary extends Component<UniversalErrorBoundaryProps, UniversalErrorBoundaryState> {
    constructor(props: UniversalErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(): { hasError: boolean } {
        return { hasError: true };
    }

    componentDidCatch(error: Error): void {
        console.error('Client-side Error:', error);
        toast.error(error.message, { position: 'top-left', duration: 5000 });
    }
    isDevelopment = process.env.debug === 'false' ? false : true;
    render(): JSX.Element | ReactNode {
        if (this.isDevelopment) {
            return this.props.children;
        }
        if (this.state.hasError) {
            return this.props.fallback;
        }
        return <ErrorBoundaryComponent fallback={this.props.fallback}>{this.props.children}</ErrorBoundaryComponent>;
    }
}

const ErrorBoundaryComponent = ({ fallback, children }: { fallback: ReactNode; children: ReactNode }): JSX.Element => {
    try {
        return <>{children}</>;
    } catch {
        return <>{fallback}</>;
    }
};

export default UniversalErrorBoundary;
