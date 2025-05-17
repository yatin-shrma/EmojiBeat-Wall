
"use client";

import type { EmojiVote } from "@/app/host/party/[partyId]/page"; // Assuming type is exported here
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useMemo } from "react";

interface VoteSummaryProps {
  votes: EmojiVote[];
  defaultChartColor?: string;
}

// Predefined vibrant colors for chart bars
const CHART_COLORS = [
  'hsl(var(--chart-1))', 
  'hsl(var(--chart-2))', 
  'hsl(var(--chart-3))', 
  'hsl(var(--chart-4))', 
  'hsl(var(--chart-5))',
];

export default function VoteSummary({ votes, defaultChartColor = "hsl(var(--primary))" }: VoteSummaryProps) {
  const topVotes = useMemo(() => {
    return [...votes]
      .sort((a, b) => b.count - a.count)
      .slice(0, 5); // Display top 5
  }, [votes]);

  if (votes.length === 0 || topVotes.every(v => v.count === 0)) {
    return <p className="text-muted-foreground py-4 text-center">No votes yet, or all votes are zero. Waiting for partygoers to vibe!</p>;
  }
  
  const totalVotes = votes.reduce((sum, vote) => sum + vote.count, 0);

  return (
    <div className="space-y-4">
       <div className="text-2xl font-bold text-center">
          Total Votes: <span className="text-primary">{totalVotes}</span>
        </div>
      {topVotes.length > 0 && (
        <div style={{ width: '100%', height: 250 }}>
          <ResponsiveContainer>
            <BarChart data={topVotes} layout="vertical" margin={{ top: 5, right: 20, left: 10, bottom: 5 }}> {/* Increased left margin */}
              <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis 
                dataKey="emoji" 
                type="category" 
                stroke="hsl(var(--muted-foreground))" 
                fontSize={14} // Reduced font size
                width={40}
                tickFormatter={(value) => `${value}`} 
              />
              <Tooltip
                cursor={{ fill: 'hsla(var(--muted), 0.3)' }}
                contentStyle={{ 
                    backgroundColor: 'hsl(var(--popover))', 
                    borderColor: 'hsl(var(--border))',
                    borderRadius: 'var(--radius)' 
                }}
                labelStyle={{ color: 'hsl(var(--popover-foreground))' }}
              />
              <Bar dataKey="count" barSize={20} radius={[0, 4, 4, 0]}>
                {topVotes.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
      <ul className="space-y-1 text-sm">
        {topVotes.map((vote, index) => (
          <li key={vote.emoji} className="flex justify-between items-center p-1.5 rounded hover:bg-muted/50">
            <span>{index + 1}. {vote.emoji}</span>
            <span className="font-semibold">{vote.count} votes</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
