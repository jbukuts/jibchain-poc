'use client';

import {
  TrendingUp,
  AlertTriangle,
  Globe,
  Layers,
  Zap,
  FileText
} from 'lucide-react';
import React, { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { Alert, AlertDescription, AlertTitle } from '#/components/ui/alert';
import { Button } from '#/components/ui/button';
import { Card, CardHeader, CardContent } from '#/components/ui/card';

const generateScenarios = (
  baseValue: number,
  volatility: number,
  steps: number
) => {
  return Array.from({ length: 5 }, () =>
    Array.from({ length: steps }, (_, i) => ({
      step: i,
      value: baseValue + (Math.random() - 0.5) * volatility * i
    }))
  );
};

const impactAreas = [
  'Cybersecurity',
  'AI and Machine Learning',
  'Supply Chain and Third-Party',
  'Regulatory and Compliance',
  'Cloud Dependency',
  'Emerging Technologies'
];
const scenarioData: Record<string, ReturnType<typeof generateScenarios>> = {};

impactAreas.forEach((area) => {
  scenarioData[area] = generateScenarios(50, 5, 10);
});

const worldEvents = [
  {
    name: 'Major Data Breach',
    probability: 0.7,
    impactAreas: [
      'Cybersecurity',
      'Regulatory and Compliance',
      'Cloud Dependency'
    ],
    mitigation:
      'Enhance data encryption, implement advanced threat detection, and develop a comprehensive incident response plan.',
    summary:
      "AT&T experienced a significant data breach compromising customer service channels and allowing unauthorized access to sensitive information. The breach resulted in the theft of six months' worth of call and text message records for nearly every AT&T cellular network customer, including metadata that could be used to approximate customer locations."
  },
  {
    name: 'AI-Driven Misinformation Campaign',
    probability: 0.6,
    impactAreas: [
      'AI and Machine Learning',
      'Emerging Technologies',
      'Regulatory and Compliance'
    ],
    mitigation:
      'Develop AI governance frameworks, invest in AI explainability technologies, and collaborate with policymakers on AI regulations.',
    summary:
      'The article discusses the dark side of AI, highlighting how bad actors are using artificial intelligence to manipulate people, undermine democratic processes, and erode trust in the digital ecosystem. AI is being employed to create deepfakes, spread disinformation, and manipulate social media platforms, posing serious implications for society.'
  },
  {
    name: 'Critical Cloud Service Outage',
    probability: 0.5,
    impactAreas: [
      'Cloud Dependency',
      'Cybersecurity',
      'Supply Chain and Third-Party'
    ],
    mitigation:
      'Implement multi-cloud strategies, develop robust business continuity plans, and negotiate strong SLAs with cloud providers.',
    summary:
      "Microsoft and Amazon Web Services (AWS) experienced significant global outages on July 30th, affecting countless businesses and individual users. Microsoft's outage was caused by a Distributed Denial-of-Service (DDoS) attack, which was amplified by an error in the implementation of their defenses. The AWS outage impacted services across its global network."
  },
  {
    name: 'Supply Chain Cyber Attack',
    probability: 0.6,
    impactAreas: [
      'Supply Chain and Third-Party',
      'Cybersecurity',
      'Emerging Technologies'
    ],
    mitigation:
      'Implement comprehensive vendor risk assessment processes, require vendors to meet specific security standards, and implement continuous monitoring of third-party risk.',
    summary:
      'The article discusses the importance of addressing third-party cybersecurity risks. With over 80% of confirmed breaches due to password-related issues, the rise of non-human identities in digital infrastructure poses a significant challenge. The article recommends a three-step process to mitigate these risks: gaining visibility, automating certificate lifecycle management, and establishing enterprise-wide policies.'
  },
  {
    name: 'New Stringent Tech Regulations',
    probability: 0.7,
    impactAreas: [
      'Regulatory and Compliance',
      'AI and Machine Learning',
      'Emerging Technologies'
    ],
    mitigation:
      'Establish a dedicated compliance team, implement adaptive compliance management systems, and engage with regulators to shape policies.',
    summary:
      'The article discusses the challenges of navigating the complex regulatory landscape in the tech industry, particularly regarding data security and privacy. It highlights the difficulty of keeping up with evolving regulatory frameworks and emphasizes the need for businesses to take a holistic approach to security that goes beyond mere compliance.'
  }
];

interface RiskEvent {
  impactAreas: string[];
  mitigation: string;
  name: string;
  probability: number;
  summary: string;
}

export default function HolisticDashboard() {
  const [selectedEvent, setSelectedEvent] = useState<RiskEvent>();
  const [selectedAspect, setSelectedAspect] = useState('Cybersecurity');
  const [activeAction, setActiveAction] = useState<string | null>(null);

  const handleEventClick = (event: RiskEvent) => {
    setSelectedEvent(event);
  };

  const getScenarioData = () => {
    return scenarioData[selectedAspect] || [];
  };

  const handleQuickAction = (action: string) => {
    setActiveAction(activeAction === action ? null : action);
  };

  return (
    <div className='p-4 max-w-6xl mx-auto'>
      <h1 className='text-2xl font-bold mb-4'>
        Comprehensive Risk Management Dashboard
      </h1>

      <Alert className='mb-4 bg-purple-100 border-purple-400 text-purple-700'>
        <Globe className='h-4 w-4' />
        <AlertTitle>Multiple Scenario Analysis</AlertTitle>
        <AlertDescription>
          Visualizing potential outcomes across various aspects of the
          organization based on identified risk events.
        </AlertDescription>
      </Alert>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
        <Card>
          <CardHeader className='flex items-center bg-purple-100'>
            <Globe className='mr-2 text-purple-600' />
            <h2 className='text-xl font-semibold text-purple-600'>
              Major Risk Events
            </h2>
          </CardHeader>
          <CardContent>
            <ul>
              {worldEvents.map((event, index) => (
                <li key={index} className='mb-2'>
                  <Button
                    variant='outline'
                    onClick={() => handleEventClick(event)}
                    className={`w-full justify-start ${event.probability > 0.6 ? 'border-red-500 text-red-700' : ''}`}>
                    {event.name} (Probability: {event.probability.toFixed(2)})
                  </Button>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex items-center bg-purple-100'>
            <AlertTriangle className='mr-2 text-purple-600' />
            <h2 className='text-xl font-semibold text-purple-600'>
              Selected Event Details
            </h2>
          </CardHeader>
          <CardContent>
            {selectedEvent ? (
              <div>
                <h3 className='font-bold'>{selectedEvent.name}</h3>
                <p>
                  <strong>Probability:</strong>{' '}
                  {selectedEvent.probability.toFixed(2)}
                </p>
                <p>
                  <strong>Potential Impact Areas:</strong>{' '}
                  {selectedEvent.impactAreas.join(', ')}
                </p>
                <p>
                  <strong>Risk Mitigation Best Practice:</strong>{' '}
                  {selectedEvent.mitigation}
                </p>
              </div>
            ) : (
              <p>Select an event to view details.</p>
            )}
          </CardContent>
        </Card>
      </div>
      <Card className='mb-4'>
        <CardHeader className='flex items-center bg-purple-100'>
          <FileText className='mr-2 text-purple-600' />
          <h2 className='text-xl font-semibold text-purple-600'>
            Article Summary
          </h2>
        </CardHeader>
        <CardContent>
          {selectedEvent ? (
            <p>{selectedEvent.summary}</p>
          ) : (
            <p>Select an event to view the related article summary.</p>
          )}
        </CardContent>
      </Card>
      <Card className='mb-4'>
        <CardHeader className='flex items-center bg-purple-100'>
          <Layers className='mr-2 text-purple-600' />
          <h2 className='text-xl font-semibold text-purple-600'>
            Risk Categories
          </h2>
        </CardHeader>
        <CardContent>
          <div className='grid grid-cols-2 md:grid-cols-3 gap-2'>
            {impactAreas.map((area, index) => (
              <Button
                key={index}
                onClick={() => setSelectedAspect(area)}
                className='text-sm'>
                {area}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
      <Card className='mb-4'>
        <CardHeader className='flex items-center bg-purple-100'>
          <TrendingUp className='mr-2 text-purple-600' />
          <h2 className='text-xl font-semibold text-purple-600'>
            Risk Scenario Analysis: {selectedAspect}
          </h2>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width='100%' height={400}>
            <LineChart margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <XAxis dataKey='step' type='number' domain={[0, 9]} />
              <YAxis />
              <Tooltip />
              <Legend />
              {getScenarioData().map((scenario, index) => (
                <Line
                  key={index}
                  data={scenario}
                  type='monotone'
                  dataKey='value'
                  stroke={`hsl(${index * 60}, 70%, 50%)`}
                  dot={false}
                  name={`Scenario ${index + 1}`}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card className='mb-4'>
        <CardHeader className='flex items-center bg-purple-100'>
          <Zap className='mr-2 text-purple-600' />
          <h2 className='text-xl font-semibold text-purple-600'>
            Quick Actions
          </h2>
        </CardHeader>
        <CardContent>
          <Button
            onClick={() => handleQuickAction('Review Mitigation Strategies')}
            className='mr-2 mb-2'>
            Review Mitigation Strategies
          </Button>
          <Button
            onClick={() => handleQuickAction('Schedule Risk Meeting')}
            className='mr-2 mb-2'>
            Schedule Risk Meeting
          </Button>
          <Button
            onClick={() => handleQuickAction('Update Risk Assessment')}
            className='mr-2 mb-2'>
            Update Risk Assessment
          </Button>

          {activeAction === 'Review Mitigation Strategies' && (
            <div className='mt-4 p-4 border rounded'>
              <h3 className='font-bold mb-2'>Review Mitigation Strategies</h3>
              {worldEvents.map((event, index) => (
                <div key={index} className='mb-2'>
                  <p>
                    <strong>{event.name}:</strong> {event.mitigation}
                  </p>
                </div>
              ))}
            </div>
          )}
          {activeAction === 'Schedule Risk Meeting' && (
            <div className='mt-4 p-4 border rounded'>
              <h3 className='font-bold mb-2'>Schedule Risk Meeting</h3>
              <p>
                Date: <input type='date' className='border rounded p-1' />
              </p>
              <p className='mt-2'>
                Time: <input type='time' className='border rounded p-1' />
              </p>
              <p className='mt-2'>
                Attendees:{' '}
                <input
                  type='text'
                  className='border rounded p-1 w-full'
                  placeholder='Enter email addresses'
                />
              </p>
              <Button className='mt-2'>Schedule</Button>
            </div>
          )}
          {activeAction === 'Update Risk Assessment' && (
            <div className='mt-4 p-4 border rounded'>
              <h3 className='font-bold mb-2'>Update Risk Assessment</h3>
              {worldEvents.map((event, index) => (
                <div key={index} className='mb-2'>
                  <p>
                    <strong>{event.name}</strong>
                  </p>
                  <p>
                    Probability:{' '}
                    <input
                      type='number'
                      defaultValue={event.probability}
                      min='0'
                      max='1'
                      step='0.1'
                      className='border rounded p-1'
                    />
                  </p>
                </div>
              ))}
              <Button className='mt-2'>Update</Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
