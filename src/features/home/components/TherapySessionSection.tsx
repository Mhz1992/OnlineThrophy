import {BookOpenIcon} from "@/features/common/assets/svg";
import {cn} from "@/lib/utils";
import {SessionListSkeleton} from "@/features/skeleton/SessionListSkeleton";
import {TherapySessionCard} from "@/features/home/components/TheraphySessionCard";
import React from "react";

export const TherapySessionSection = ({therapySessions, isLoading}: {
    therapySessions: TherapySession[],
    isLoading: boolean
}) => {
    return (
        <div className="w-full mt-6 relative">
            <h3 className="text-xl font-semibold text-right mb-4 flex items-center text-foreground">
                <BookOpenIcon className="w-5 h-5 mx-3"/>
                جلسات آموزشی
            </h3>
            {isLoading ? (
                <SessionListSkeleton/>
            ) : (
                <div className="space-y-4">
                    {therapySessions.map((session) => (
                        <TherapySessionCard
                            key={session.id}
                            title={session.title}
                            link={`/sessions/${session.id}`}
                            status={session.status}
                            description={session.description}
                        />
                    ))
                    }
                </div>
            )}
        </div>
    );
}