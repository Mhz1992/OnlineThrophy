import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SessionContent } from '@/types/api';

interface ContentRendererProps {
    content: SessionContent;
}

const ContentRenderer: React.FC<ContentRendererProps> = ({ content }) => {
    switch (content.type) {
        case 'text':
            return <p className="text-base leading-relaxed">{content.value}</p>;
        case 'image':
            return (
                <div className="relative w-full h-auto max-h-[400px] overflow-hidden rounded-lg shadow-md">
                    <Image
                        src={content.value}
                        alt={content.title || 'Session Image'}
                        layout="responsive"
                        width={700} // Provide a default width
                        height={400} // Provide a default height
                        objectFit="contain"
                        className="rounded-lg"
                    />
                </div>
            );
        case 'video':
            // Assuming content.value is a YouTube embed URL or similar
            return (
                <div className="relative w-full" style={{ paddingBottom: '56.25%' /* 16:9 Aspect Ratio */ }}>
                    <iframe
                        className="absolute top-0 left-0 w-full h-full rounded-lg shadow-md"
                        src={content.value}
                        title={content.title || 'Session Video'}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
            );
        case 'link':
            return (
                <Link href={content.value} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline dark:text-blue-400">
                    {content.title || content.value}
                </Link>
            );
        default:
            return <p className="text-red-500">Unsupported content type: {content.type}</p>;
    }
};

export default ContentRenderer;
