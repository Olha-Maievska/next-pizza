'use client'

import { Api } from '@/shared/services/api-client'
import { IStory } from '@/shared/services/stories'
import React, { useEffect, useState } from 'react'
import { Container } from './container'
import { cn } from '@/shared/lib/utils'
import { X } from 'lucide-react'
import ReactStories from 'react-insta-stories'

interface Props {
  className?: string
}

export const Stories: React.FC<Props> = ({ className }) => {
  const [stories, setStories] = useState<IStory[]>([])
  const [selectedStory, setSelectedStory] = useState<IStory>()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    async function getStories() {
      const data = await Api.stories.getAll()
      setStories(data)
    }

    getStories()
  }, [])

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }

    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [open])

  function onClickStory(story: IStory) {
    setSelectedStory(story)

    if (story.items.length > 0) {
      setOpen(true)
    }
  }

  return (
    <>
      <Container
        className={cn(
          'flex items-center justify-between gap-2 my-10',
          className
        )}
      >
        {stories.length === 0 &&
          [...Array(6)].map((_, index) => (
            <div
              key={index}
              className="w-[200px] h-[250px] bg-gray-200 animate-pulse rounded-md"
            />
          ))}

        {stories.map((story) => (
          <img
            key={story.id}
            className="w-[200px] h-[250px] rounded-md cursor-pointer bg-gray-200"
            src={story.previewImageUrl}
            alt=""
            onClick={() => onClickStory(story)}
          />
        ))}

        {open && (
          <div
            className="absolute left-0 top-0 w-full h-full bg-black/80 flex items-center justify-center z-30 overflow-y-hidden"
            onClick={() => setOpen(false)}
          >
            <div
              className="relative"
              style={{ width: 420 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute -right-10 -top-5 z-30"
                onClick={() => setOpen(false)}
              >
                <X className="h-8 w-8 absolute right-0 top-0 text-white/50" />
              </button>

              <ReactStories
                stories={
                  selectedStory?.items.map((item) => ({
                    url: item.sourceUrl,
                  })) || []
                }
                defaultInterval={3000}
                width={420}
                height={550}
                onAllStoriesEnd={() => {
                  setOpen(false)
                }}
              />
            </div>
          </div>
        )}
      </Container>
    </>
  )
}
