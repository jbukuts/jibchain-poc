'use client';

import { TrendingUp, AlertTriangle, Globe, FileText } from 'lucide-react';
import React, { useMemo, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Legend,
  CartesianGrid,
  Label
} from 'recharts';
import ScheduleMeeting from '#/components/custom/schedule-meeting';
import { Alert, AlertDescription, AlertTitle } from '#/components/ui/alert';
import { Button } from '#/components/ui/button';
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardFooter
} from '#/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '#/components/ui/chart';
import { Input } from '#/components/ui/input';
import { Slider } from '#/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '#/components/ui/tabs';
import { toast } from '#/components/ui/use-toast';

const generateRandomNum = (base: number, vol: number) => {
  return base + (Math.random() - 0.5) * vol;
};

const worldEvents = [
  {
    name: 'Major Data Breach',
    probability: 0.5,
    category: 'Cybersecurity',
    impactAreas: ['Data Security', 'Customer Trust', 'Financial Loss'],
    mitigation:
      'Implement robust encryption, regular security audits, and comprehensive incident response plans.',
    summary:
      'Major corporations continue to suffer large-scale data breaches, exposing sensitive customer information.',
    justification:
      "According to IBM's Cost of a Data Breach Report 2023, the global average total cost of a data breach reached $4.45 million in 2023, a 15% increase over 3 years. The frequency of breaches has also increased, with 83% of organizations studied having experienced more than one data breach."
  },
  {
    name: 'Ransomware Attack',
    probability: 0.75,
    category: 'Cybersecurity',
    impactAreas: ['Service Availability', 'Financial Loss', 'Public Trust'],
    mitigation:
      "Implement robust backup systems, conduct regular security awareness training, and develop a comprehensive incident response plan that doesn't involve paying ransoms.",
    summary:
      'Ransomware attacks continue to evolve and target organizations across various sectors.',
    justification:
      'The Verizon 2023 Data Breach Investigations Report indicates that ransomware has maintained its prevalence, involved in 24% of all breaches. The report also notes a 13% increase in ransomware incidents compared to the previous year.'
  },
  {
    name: 'AI-Driven Misinformation Campaign',
    probability: 0.6,
    category: 'AI and Machine Learning',
    impactAreas: ['Public Trust', 'Data Security', 'Customer Trust'],
    mitigation:
      'Develop AI governance frameworks, invest in AI explainability technologies, and collaborate with policymakers on AI regulations.',
    summary:
      'The rise of sophisticated AI tools has increased the potential for large-scale misinformation campaigns.',
    justification:
      'A 2023 report from the Stanford Internet Observatory highlights the increasing use of AI in creating and spreading misinformation. The report notes a 200% increase in AI-generated deepfakes over the past year, with a 70% improvement in their quality, making detection increasingly difficult.'
  },
  {
    name: 'Cloud Service Provider Outage',
    probability: 0.6,
    category: 'Cloud Dependency',
    impactAreas: ['Service Availability', 'Customer Trust'],
    mitigation:
      'Implement multi-cloud strategies, develop robust business continuity plans, and negotiate strong SLAs with cloud providers.',
    summary:
      'Major cloud providers have experienced significant outages, affecting numerous businesses and services.',
    justification:
      "According to the Uptime Institute's 2023 Global Data Center Survey, 80% of data center managers and operators have experienced some type of outage in the past three years. The report also notes that 20% of organizations have suffered a serious or severe outage that resulted in significant financial losses."
  },
  {
    name: 'Supply Chain Cyber Attack',
    probability: 0.4,
    category: 'Supply Chain and Third-Party',
    impactAreas: [
      'Service Availability',
      'Data Security',
      'Regulatory Compliance'
    ],
    mitigation:
      'Implement comprehensive vendor risk assessment processes, require vendors to meet specific security standards, and implement continuous monitoring of third-party risk.',
    summary:
      'Organizations face increasing risks from cybersecurity breaches occurring in their supply chain.',
    justification:
      "The European Union Agency for Cybersecurity (ENISA) Threat Landscape 2023 report identifies supply chain attacks as one of the top threats, with a 42% increase in reported incidents compared to the previous year. The report estimates that 62% of system intrusions now come through an organization's supply chain."
  },
  {
    name: 'Regulatory Non-Compliance',
    probability: 0.5,
    category: 'Regulatory and Compliance',
    impactAreas: ['Regulatory Compliance', 'Financial Loss', 'Public Trust'],
    mitigation:
      'Establish a dedicated compliance team, implement adaptive compliance management systems, and engage with regulators to shape policies.',
    summary:
      'Rapidly evolving data protection and privacy regulations pose significant compliance challenges for organizations.',
    justification:
      'The IAPP-EY Annual Privacy Governance Report 2023 indicates that 63% of organizations struggle to keep up with changing privacy regulations. The report also notes a 22% increase in privacy-related fines and penalties over the past year, with the average fine for GDPR non-compliance reaching €4.7 million.'
  }
];

const impactAreas = Array.from(
  worldEvents.reduce((acc, curr) => {
    const { impactAreas } = curr;
    impactAreas.forEach((a) => acc.add(a));
    return acc;
  }, new Set<string>([]))
);

interface RiskEvent {
  impactAreas: string[];
  mitigation: string;
  name: string;
  probability: number;
  summary: string;
  justification: string;
}

export default function HolisticDashboard() {
  const [selectedEvent, setSelectedEvent] = useState<RiskEvent>();

  const [probValues, setProbValues] = useState<number[]>(
    worldEvents.map((e) => e.probability * 100)
  );

  const handleEventClick = (event: RiskEvent) => {
    setSelectedEvent(event);
  };

  const calculateMockData = useMemo(() => {
    if (!selectedEvent) return [];
    const { impactAreas, probability } = selectedEvent;

    const d: Record<string, any>[] = [];
    const steps = 4;
    for (let i = 0; i < steps; i++) {
      d.push({ step: i });

      for (const area of impactAreas) {
        d[i][area] = generateRandomNum(probability * 100, 25);
      }
    }

    return d;
  }, [selectedEvent?.name, selectedEvent?.impactAreas]);

  const cardTitleClass = 'flex flex-row items-center gap-2';

  return (
    <div className='p-4 mx-auto'>
      <h1 className='text-3xl font-bold mb-4'>
        Comprehensive Risk Management Dashboard
      </h1>
      <Alert className='mb-4 z-0'>
        <AlertTitle>Multiple Scenario Analysis</AlertTitle>
        <AlertDescription>
          Visualizing potential outcomes across various aspects of the
          organization based on identified risk events.
        </AlertDescription>
      </Alert>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
        <Card className='p-0'>
          <CardHeader>
            <CardTitle className={cardTitleClass}>
              <Globe size={20} />
              Major Risk Events
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul>
              {worldEvents.map((event, index) => (
                <li key={index} className='mb-2'>
                  <Button
                    variant='outline'
                    onClick={() => handleEventClick(event)}
                    className={`w-full justify-between ${event.probability > 0.6 ? 'border-destructive text-destructive' : ''} ${selectedEvent?.name === event.name ? 'ring-1' : ''}`}>
                    {event.name}
                    <span className='flex flex-row gap-2'>
                      {(event.probability * 100).toFixed(0)}%
                    </span>
                  </Button>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card className='p-0'>
          <CardHeader>
            <CardTitle className={cardTitleClass}>
              <AlertTriangle size={20} />
              Selected Event Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedEvent ? (
              <>
                <h3 className='font-bold text-lg mb-1.5'>
                  {selectedEvent.name}
                </h3>
                <div className='flex flex-col gap-2'>
                  <div>
                    <p>
                      <strong>Probability:</strong>
                    </p>
                    <p
                      className={
                        selectedEvent.probability > 0.6
                          ? 'text-destructive'
                          : ''
                      }>
                      {selectedEvent.probability.toFixed(2)}
                    </p>
                  </div>

                  <div>
                    <p>
                      <strong>Potential Impact Areas</strong>
                    </p>
                    <p>{selectedEvent.impactAreas.join(', ')}</p>
                  </div>

                  <div>
                    <p>
                      <strong>Risk Mitigation Best Practice</strong>
                    </p>
                    <p>{selectedEvent.mitigation}</p>
                  </div>

                  <div>
                    <p>
                      <strong>Justification</strong>
                    </p>
                    <p>{selectedEvent.justification}</p>
                  </div>
                </div>
              </>
            ) : (
              <p className='italic'>Select an event to view details.</p>
            )}
          </CardContent>
        </Card>
      </div>

      <Card className='mb-4 p-0'>
        <CardHeader>
          <CardTitle className={cardTitleClass}>
            <FileText size={20} />
            Article Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          {selectedEvent ? (
            <p>{selectedEvent.summary}</p>
          ) : (
            <p className='italic'>
              Select an event to view the related article summary.
            </p>
          )}
        </CardContent>
      </Card>

      <Card className='mb-4 p-0'>
        <CardHeader>
          <CardTitle className={cardTitleClass}>
            <TrendingUp size={20} />
            Risk Scenario Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={{}}>
            <LineChart accessibilityLayer data={calculateMockData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey='step'
                type='number'
                domain={[0, 3]}
                tickCount={4}
                tickFormatter={(v: number) => `${v * 30} days`}>
                <Label value={'Time'} position={'insideBottom'} offset={0} />
              </XAxis>
              <YAxis domain={[0, 100]} tickFormatter={(v: number) => `${v}%`}>
                <Label
                  value={'Risk Probability'}
                  position={'insideLeft'}
                  angle={-90}
                />
              </YAxis>
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <Legend offset={100} />
              {impactAreas.map((area, index) => (
                <Line
                  key={index}
                  type='monotone'
                  dataKey={area}
                  stroke={`hsl(var(--chart-${index + 1}))`}
                  dot={true}
                  name={area}
                  strokeWidth={2}
                />
              ))}
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Tabs defaultValue='review-strategy'>
        <TabsList>
          <TabsTrigger value='review-strategy'>
            Review Mitigation Strategies
          </TabsTrigger>
          <TabsTrigger value='schedule-meeting'>
            Schedule Risk Meeting
          </TabsTrigger>
          <TabsTrigger value='upddate-risk-assessment'>
            Update Risk Assessment
          </TabsTrigger>
        </TabsList>
        <TabsContent value='review-strategy'>
          <Card>
            <CardHeader>
              <CardTitle>Review Mitigation Strategies</CardTitle>
            </CardHeader>
            <CardContent>
              {worldEvents.map((event, index) => (
                <div key={index} className='mb-2'>
                  <p className='font-bold'>{event.name}:</p>
                  <p>{event.mitigation}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value='schedule-meeting'>
          <ScheduleMeeting />
        </TabsContent>
        <TabsContent value='upddate-risk-assessment'>
          <Card>
            <CardHeader>
              <CardTitle>Update Risk Assessment</CardTitle>
            </CardHeader>
            <CardContent className='grid grid-cols-2 gap-x-8 gap-y-2'>
              {worldEvents.map((event, idx) => (
                <div key={idx} className='mb-2'>
                  <p>
                    <strong>{event.name}</strong>
                  </p>

                  <div className='flex flex-row gap-3'>
                    <Slider
                      step={5}
                      min={0}
                      max={100}
                      value={[probValues[idx]]}
                      onValueChange={(v) =>
                        setProbValues((c) => {
                          const t: number[] = JSON.parse(JSON.stringify(c));
                          t[idx] = v[0];
                          return t;
                        })
                      }
                    />
                    <Input
                      type='number'
                      value={probValues[idx]}
                      onChange={(e) =>
                        setProbValues((c) => {
                          const t: number[] = JSON.parse(JSON.stringify(c));
                          t[idx] = parseInt(e.target.value);
                          return t;
                        })
                      }
                      min='0'
                      max='1'
                      step='0.1'
                      className='w-52'
                    />
                  </div>
                </div>
              ))}
            </CardContent>

            <CardFooter>
              <Button
                onClick={() => {
                  toast({
                    title: 'Risk Assessment updated',
                    description: 'Your Risk Assessment has been updated.'
                  });
                }}>
                Update
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
