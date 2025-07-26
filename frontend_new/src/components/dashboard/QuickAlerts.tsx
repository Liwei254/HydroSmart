import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Wrench, Wifi, CheckCircle } from "lucide-react";

interface Alert {
  id: string;
  type: "warning" | "maintenance" | "network" | "info";
  title: string;
  message: string;
  timestamp: string;
  status: "active" | "resolved";
}

interface QuickAlertsProps {
  alerts?: Alert[];
  loading: boolean;
  error: string | null;
}

const alertIcons = {
  warning: AlertTriangle,
  maintenance: Wrench,
  network: Wifi,
  info: CheckCircle
};

const alertColors = {
  warning: "text-warning",
  maintenance: "text-primary", 
  network: "text-muted-foreground",
  info: "text-success"
};

const alertBgColors = {
  warning: "bg-warning/10 border-warning/20",
  maintenance: "bg-primary/10 border-primary/20",
  network: "bg-muted/10 border-border", 
  info: "bg-success/10 border-success/20"
};

export function QuickAlerts({ alerts = [], loading, error }: QuickAlertsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <AlertTriangle className="w-5 h-5 text-warning" />
          <span>Recent Alerts</span>
          <span className="ml-auto text-sm font-normal text-muted-foreground">
            {!loading && !error ? alerts.filter(a => a.status === 'active').length : 0} active
          </span>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-3">
        {loading ? (
          <p>Loading alerts...</p>
        ) : error ? (
          <p className="text-destructive">{error}</p>
        ) : (
          alerts.map((alert) => {
            const Icon = alertIcons[alert.type];
            return (
              <div 
                key={alert.id}
                className={`p-3 rounded-lg border transition-all hover:shadow-sm ${alertBgColors[alert.type]} ${
                  alert.status === 'resolved' ? 'opacity-60' : ''
                }`}
              >
                <div className="flex items-start space-x-3">
                  <Icon className={`w-4 h-4 mt-0.5 flex-shrink-0 ${alertColors[alert.type]}`} />
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <h4 className="text-sm font-medium text-foreground">{alert.title}</h4>
                      {alert.status === 'resolved' && (
                        <CheckCircle className="w-3 h-3 text-success flex-shrink-0 ml-2" />
                      )}
                    </div>
                    
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                      {alert.message}
                    </p>
                    
                    <p className="text-xs text-muted-foreground mt-2 font-medium">
                      {alert.timestamp}
                    </p>
                  </div>
                </div>
              </div>
            );
          })
        )}
        
        <div className="pt-2 border-t">
          <button className="w-full text-sm text-primary hover:text-primary/80 font-medium">
            View all alerts →
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
