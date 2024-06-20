import React from 'react'
import { Skeleton } from './ui/skeleton'

const TaskCardLoader = () => {
    return (
        <>
            <div
                className={`flex justify-between w-full  p-3 items-center  border rounded-md flex-row`
                }>
                <div className="flex gap-2 items-center">
                    <div>
                        <Skeleton className='w-5 h-5 rounded-full' />
                    </div>
                    <div className={`flex flex-col gap-1`}>
                        <Skeleton className='w-[250px] h-4' />
                        <div className="flex gap-1 text-[#6d7b87]">
                            <Skeleton className='w-[40px] h-4' />
                            <Skeleton className='w-0.5 h-6' />

                            <Skeleton className='w-[80px] h-4' />

                        </div>
                    </div>
                </div>
                {/* priority/ del button */}
                <div className="flex gap-2 items-center">
                    <Skeleton className='h-4 w-4' />
                </div>
            </div>

        </>
    )
}

export default TaskCardLoader