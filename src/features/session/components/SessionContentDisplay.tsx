'use client';

import React, {useEffect, useRef, useState} from 'react';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Button} from '@/components/button';
import {PauseIcon, PlayIcon} from 'lucide-react';
import {cn} from '@/lib/utils';
import WaveSurfer from 'wavesurfer.js';


interface AudioPlayerProps {
    id: string;
    title?: string;
    link: string;
    isPlaying: boolean; // This prop tells the component if it *should* be playing
    onTogglePlayPause: (id: string) => void; // Callback to parent to toggle this audio's state
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({id, title, link, isPlaying, onTogglePlayPause}) => {
    const waveformRef = useRef<HTMLDivElement>(null);
    const wavesurfer = useRef<WaveSurfer | null>(null);
    const [isReady, setIsReady] = useState(false);
    // isLocalPlaying will reflect the actual state of the wavesurfer instance
    const [isLocalPlaying, setIsLocalPlaying] = useState(false);

    useEffect(() => {
        if (waveformRef.current) {
            wavesurfer.current = WaveSurfer.create({
                container: waveformRef.current,
                waveColor: '#A8B0B9',
                progressColor: '#1F95EB',
                cursorColor: '#000',
                barWidth: 2,
                barRadius: 3,
                barGap: 1,
                height: 60,
                // responsive: true, // Removed this line
                hideScrollbar: true,
                url: link,
            });

            wavesurfer.current.on('ready', () => {
                setIsReady(true);
                // When ready, if it should be playing according to parent, play it.
                if (isPlaying) {
                    wavesurfer.current?.play().catch(e => console.error("Error playing audio on ready:", e));
                }
            });

            wavesurfer.current.on('play', () => {
                setIsLocalPlaying(true);
            });

            wavesurfer.current.on('pause', () => {
                setIsLocalPlaying(false);
            });

            wavesurfer.current.on('finish', () => {
                setIsLocalPlaying(false);
                // When finished, also tell the parent to stop playing this audio
                onTogglePlayPause(id);
            });

            wavesurfer.current.on('error', (err) => {
                console.error('WaveSurfer error:', err);
                setIsReady(false);
            });
        }

        return () => {
            wavesurfer.current?.destroy();
        };
    }, [link]); // Re-create wavesurfer if link changes

    // Effect to synchronize wavesurfer's state with the `isPlaying` prop from parent
    useEffect(() => {
        if (!wavesurfer.current || !isReady) return;

        if (isPlaying && !isLocalPlaying) {
            // If parent says play, but local is paused, then play
            wavesurfer.current.play().catch(e => console.error("Error playing audio (sync):", e));
        } else if (!isPlaying && isLocalPlaying) {
            // If parent says pause, but local is playing, then pause
            wavesurfer.current.pause();
        }
    }, [isPlaying, isReady, isLocalPlaying, id, onTogglePlayPause]); // Added id, onTogglePlayPause to dependencies

    const handlePlayPause = () => {
        if (!isReady) return; // Don't allow interaction if not ready

        // Always inform the parent about the toggle action
        onTogglePlayPause(id);
    };

    return (
        <Card className="w-full rounded-lg shadow-md" style={{backgroundColor: '#F2F2F2'}}>
            <CardHeader>
                {title && <CardTitle className="text-right text-primary">{title}</CardTitle>}
            </CardHeader>
            <CardContent className="flex items-center mx-0">
                <Button onClick={handlePlayPause} variant="outline" size="icon" isLoading={!isReady}>
                    {isLocalPlaying ? <PauseIcon className="h-5 w-5"/> : <PlayIcon className="h-5 w-5"/>}
                </Button>
                <div ref={waveformRef} className="flex-1 mx-4 h-[60px]">
                    {!isReady && (
                        <div className="flex items-center justify-center h-full text-xs text-gray-600">
                            در حال بارگذاری صوت...
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};


export const SessionContentDisplay: React.FC<{ media: SessionMedia[] }> = ({media}) => {
    const [currentlyPlayingAudioId, setCurrentlyPlayingAudioId] = useState<string | null>(null);

    const handleAudioTogglePlayPause = (id: string) => {
        setCurrentlyPlayingAudioId(prevId => (prevId === id ? null : id));
    };

    return (
        <div className="space-y-6 py-4">
            {media.map((content) => (
                <div key={content.id}>
                    {content.media_type === 'video' && content.value && (
                        <div className="flex flex-col items-center">
                            {content.title && (
                                <h2 className={cn("text-lg font-bold mb-4 text-right w-full text-primary")}>{content.title}</h2>
                            )}
                            <div className="relative w-full" style={{paddingBottom: '56.25%'}}>
                                <iframe
                                    className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
                                    src={content.value}
                                    title={content.title || "Session Video"}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        </div>
                    )}

                    {content.media_type === 'text' && content.value && (
                        <Card className="w-full rounded-lg shadow-md" style={{backgroundColor: '#F2F2F2'}}>
                            <CardHeader>
                                {content.title && <CardTitle className="text-right">{content.title}</CardTitle>}
                            </CardHeader>
                            <CardContent className="text-right">
                                <p className="text-sm text-gray-800 text-justify">{content.value}</p>
                            </CardContent>
                        </Card>
                    )}

                    {content.media_type === 'voice' && content.value && (
                        <AudioPlayer
                            id={content.id}
                            title={content.title}
                            link={content.value}
                            isPlaying={currentlyPlayingAudioId === content.id}
                            onTogglePlayPause={handleAudioTogglePlayPause}
                        />
                    )}
                </div>
            ))}
        </div>
    );
};
