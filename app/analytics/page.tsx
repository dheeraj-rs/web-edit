"use client";

import { useState } from "react";
import DashboardLayout from "@/components/dashboard/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowUpRight, ArrowDownRight, Clock, PieChart } from "lucide-react";
import { AreaChart, Area, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const performanceData = [
  { name: "Page 1", nextJs: 1.2, react: 1.8, astro: 0.9, vite: 1.0 },
  { name: "Page 2", nextJs: 2.5, react: 3.1, astro: 1.8, vite: 2.2 },
  { name: "Page 3", nextJs: 0.8, react: 1.2, astro: 0.6, vite: 0.7 },
  { name: "Page 4", nextJs: 3.2, react: 3.8, astro: 2.1, vite: 2.5 },
  { name: "Page 5", nextJs: 1.8, react: 2.2, astro: 1.2, vite: 1.5 },
];

const visitorsData = [
  { date: "Apr 01", visitors: 1234 },
  { date: "Apr 02", visitors: 2342 },
  { date: "Apr 03", visitors: 3512 },
  { date: "Apr 04", visitors: 2854 },
  { date: "Apr 05", visitors: 1932 },
  { date: "Apr 06", visitors: 2543 },
  { date: "Apr 07", visitors: 4123 },
];

const bundleSizeData = [
  { name: "JS", value: 345 },
  { name: "CSS", value: 87 },
  { name: "Images", value: 234 },
  { name: "Fonts", value: 56 },
  { name: "Other", value: 23 },
];

export default function Analytics() {
  const [dateRange, setDateRange] = useState("7d");
  
  return (
    <DashboardLayout>
      <div className="px-6 py-6 md:px-10 md:py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
            <p className="text-muted-foreground mt-1">
              Track your website performance and user engagement
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-2">
            <Button variant="outline" size="sm" onClick={() => setDateRange("7d")} className={dateRange === "7d" ? "bg-muted" : ""}>
              7 days
            </Button>
            <Button variant="outline" size="sm" onClick={() => setDateRange("30d")} className={dateRange === "30d" ? "bg-muted" : ""}>
              30 days
            </Button>
            <Button variant="outline" size="sm" onClick={() => setDateRange("90d")} className={dateRange === "90d" ? "bg-muted" : ""}>
              90 days
            </Button>
          </div>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Visitors</CardTitle>
              <ArrowUpRight className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">18,549</div>
              <p className="text-xs text-muted-foreground">
                +12.5% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Avg. Build Time</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1.8s</div>
              <p className="text-xs text-muted-foreground">
                -0.3s from last week
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Bounce Rate</CardTitle>
              <ArrowDownRight className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">32.1%</div>
              <p className="text-xs text-muted-foreground">
                -2.4% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Bundle Size</CardTitle>
              <PieChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">745 KB</div>
              <p className="text-xs text-muted-foreground">
                +15 KB from last build
              </p>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="performance" className="space-y-6">
          <TabsList className="w-full sm:w-auto">
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="visitors">Visitors</TabsTrigger>
            <TabsTrigger value="bundle">Bundle Analysis</TabsTrigger>
          </TabsList>
          
          <TabsContent value="performance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Page Load Times by Framework</CardTitle>
                <CardDescription>
                  Compare load times across different frameworks
                </CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={performanceData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis label={{ value: 'Load Time (s)', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="nextJs" name="Next.js" fill="hsl(var(--chart-1))" />
                    <Bar dataKey="react" name="React" fill="hsl(var(--chart-2))" />
                    <Bar dataKey="astro" name="Astro" fill="hsl(var(--chart-3))" />
                    <Bar dataKey="vite" name="Vite" fill="hsl(var(--chart-4))" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="visitors" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Daily Visitors</CardTitle>
                <CardDescription>
                  Track visitors over time
                </CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={visitorsData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="visitors" stroke="hsl(var(--chart-2))" fill="hsl(var(--chart-2) / 0.2)" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="bundle" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Bundle Size Breakdown</CardTitle>
                <CardDescription>
                  Analyze your bundle composition
                </CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Tooltip />
                    <Legend layout="vertical" verticalAlign="middle" align="right" />
                    <Pie
                      data={bundleSizeData}
                      cx="40%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {bundleSizeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={`hsl(var(--chart-${index + 1}))`} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}