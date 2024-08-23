'use client';

import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { X } from 'lucide-react';
import React, { useState } from 'react';
import { TimePicker12 } from '#/components/custom/time-picker-12h';
import { Button } from '#/components/ui/button';
import { Calendar } from '#/components/ui/calendar';
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardFooter
} from '#/components/ui/card';
import { Input } from '#/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '#/components/ui/popover';
import { toast } from '#/components/ui/use-toast';
import { cn } from '#/lib/utils';
import { Badge } from '../ui/badge';

export default function ScheduleMeeting() {
  const [date, setDate] = useState<Date>();

  const [attendee, setAntendee] = useState<string>('');
  const [attendeeList, setAttendeeList] = useState<string[]>([]);

  const addAttendee = () => {
    setAttendeeList((c) => [...c, attendee]);
    setAntendee('');
  };

  const removeAttendee = (idx: number) => {
    setAttendeeList((c) => {
      return [...c.slice(0, idx), ...c.slice(idx + 1)];
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Schedule Risk Meeting</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='flex flex-row gap-2'>
          <div className='flex flex-col gap-2'>
            <span className='text-lg font-semibold'>Pick Time</span>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={'outline'}
                  className={cn(
                    'w-[280px] justify-start text-left font-normal',
                    !date && 'text-muted-foreground'
                  )}>
                  <CalendarIcon className='mr-2 h-4 w-4' />
                  {date ? format(date, 'PPP') : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className='w-auto p-0'>
                <Calendar
                  mode='single'
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
                <div className='p-3 border-t border-border flex justify-center'>
                  <TimePicker12 date={date} setDate={setDate} />
                </div>
              </PopoverContent>
            </Popover>
          </div>
          <div className='flex flex-col gap-2'>
            <span className='text-lg font-semibold'>Attendees</span>
            <div className='flex flex-row gap-3'>
              <Input
                type='email'
                placeholder='Email'
                className='w-56'
                value={attendee}
                onChange={(v) => setAntendee(v.target.value)}
              />
              <Button variant={'outline'} onClick={addAttendee}>
                Add
              </Button>
            </div>
          </div>
        </div>
        <div className='mt-2'>
          {attendeeList.map((a, idx) => (
            <Badge
              key={idx}
              className='px-2 py-1.5'
              variant={'secondary'}
              onClick={() => removeAttendee(idx)}>
              {a}
              <X size={16} className='ml-2' />
            </Badge>
          ))}
        </div>

        <CardFooter className='p-0 mt-4'>
          <Button
            className='ml-auto'
            onClick={() =>
              toast({
                title: 'Meeting Scheduled',
                description: 'Your Risk Meeting has been scheduled'
              })
            }>
            Schedule
          </Button>
        </CardFooter>
      </CardContent>
    </Card>
  );
}
