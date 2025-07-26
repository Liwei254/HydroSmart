import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Droplets, Activity } from "lucide-react";

interface SimpleLineChartProps {
  data?: Array<{day: string, [key: string]: any}>;
  dataKey: string;
  color: string;
  height?: number;
}

function SimpleLineChart({ data = [], dataKey, color, height = 60 }: SimpleLineChartProps) {
  const values = data.map(d => d[dataKey]);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  
  const points = data.map((item, index) => {
    const x = (index / (data.length - 1)) * 100;
    const y = ((max - item[dataKey]) / range) * height;
    return `${x},${y}`;
  }).join(' ');
  
  return (
    <div className="relative w-full" style={{ height }}>
      <svg width="100%" height={height} className="overflow-visible">
        <polyline
          fill="none"
          stroke={color}
          strokeWidth="2"
          points={points}
          className="drop-shadow-sm"
        />
        {data.map((item, index) => {
          const x = (index / (data.length - 1)) * 100;
          const y = ((max - item[dataKey]) / range) * height;
          return (
            <circle
              key={index}
              cx={`${x}%`}
              cy={y}
              r="3"
              fill={color}
              className="drop-shadow-sm"
            />
          );
        })}
      </svg>
    </div>
  );
}

interface MiniChartsProps {
  waterLevelData?: Array<{day: string, level: number}>;
  usageData?: Array<{day: string, usage: number}>;
  vibrationData?: Array<{day: string, vibration: number}>;
  loading: boolean;
  error: string | null;
}

export function MiniCharts({ waterLevelData = [], usageData = [], vibrationData = [], loading, error }: MiniChartsProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Water Level Trend */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center space-x-2">
            <Droplets className="w-4 h-4 text-primary" />
            <span>Water Level (7 days)</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p>Loading water level data...</p>
          ) : error ? (
            <p className="text-destructive">{error}</p>
          ) : (
            <>
              <SimpleLineChart 
                data={waterLevelData} 
                dataKey="level" 
                color="hsl(var(--primary))"
                height={60}
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-2">
                <span>Mon</span>
                <span>Today</span>
              </div>
              <div className="mt-2 flex items-center space-x-2">
                <TrendingUp className="w-3 h-3 text-success" />
                <span className="text-xs text-success font-medium">Stable levels</span>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Usage Trend */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center space-x-2">
            <TrendingUp className="w-4 h-4 text-secondary" />
            <span>Daily Usage (Litres)</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p>Loading usage data...</p>
          ) : error ? (
            <p className="text-destructive">{error}</p>
          ) : (
            <>
              <SimpleLineChart 
                data={usageData} 
                dataKey="usage" 
                color="hsl(var(--secondary))"
                height={60}
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-2">
                <span>Mon</span>
                <span>Today</span>
              </div>
              <div className="mt-2 flex items-center space-x-2">
                <TrendingUp className="w-3 h-3 text-secondary" />
                <span className="text-xs text-secondary font-medium">+5% this week</span>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Vibration Index */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center space-x-2">
            <Activity className="w-4 h-4 text-warning" />
            <span>Vibration Index</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p>Loading vibration data...</p>
          ) : error ? (
            <p className="text-destructive">{error}</p>
          ) : (
            <>
              <SimpleLineChart 
                data={vibrationData} 
                dataKey="vibration" 
                color="hsl(var(--warning))"
                height={60}
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-2">
                <span>Mon</span>
                <span>Today</span>
              </div>
              <div className="mt-2 flex items-center space-x-2">
                <Activity className="w-3 h-3 text-success" />
                <span className="text-xs text-success font-medium">Normal range</span>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
