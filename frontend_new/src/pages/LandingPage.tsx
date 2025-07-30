//landingpage.tsx// 
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Droplets, Wifi, ShieldAlert, Gauge, Smartphone } from "lucide-react";
import { Link } from "react-router-dom";

export function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-background">
      {/* Hero Section */}
      <section className="container py-16 md:py-24">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1 space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Smart Borehole Monitoring for <span className="text-primary">Rural Water</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Real-time monitoring, predictive maintenance, and water level tracking for sustainable rural water access.
            </p>
            <div className="flex gap-4 pt-4">
              <Button asChild>
                <Link to="/login">Dashboard Login</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="#features">Learn More</Link>
              </Button>
            </div>
          </div>
          <div className="flex-1">
            <img 
              src="/borehole-illustration.png" 
              alt="Borehole monitoring system"
              className="w-full max-w-lg mx-auto"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container py-16 space-y-12">
        <h2 className="text-3xl font-bold text-center">System Features</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <Droplets className="w-8 h-8 text-primary" />
              <CardTitle>Water Level Monitoring</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Real-time tracking of water levels with alerts for critical thresholds.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <ShieldAlert className="w-8 h-8 text-primary" />
              <CardTitle>Pump Health Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Vibration monitoring and predictive maintenance alerts.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <Gauge className="w-8 h-8 text-primary" />
              <CardTitle>Dashboard Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Comprehensive usage trends and historical data visualization.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="container py-16 space-y-12 bg-background rounded-lg">
        <h2 className="text-3xl font-bold text-center">How It Works</h2>
        <div className="grid gap-8 md:grid-cols-3">
          {[
            {
              icon: <Wifi className="w-6 h-6" />,
              title: "1. Sensor Installation",
              description: "Ultrasonic and vibration sensors installed in the borehole"
            },
            {
              icon: <Smartphone className="w-6 h-6" />,
              title: "2. Data Transmission",
              description: "Real-time data sent via GSM/WiFi to our cloud servers"
            },
            {
              icon: <Droplets className="w-6 h-6" />,
              title: "3. Monitoring & Alerts",
              description: "Get instant notifications on water levels and pump status"
            }
          ].map((item, index) => (
            <div key={index} className="flex gap-4">
              <div className="p-3 bg-primary/10 rounded-full">
                {item.icon}
              </div>
              <div>
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container py-16 text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to Monitor Your Borehole?</h2>
        <Button asChild size="lg">
          <Link to="/login">Access Dashboard</Link>
        </Button>
      </section>
    </div>
  );
}