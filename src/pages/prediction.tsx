import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, Bed, Bath, Ruler, Star, Calendar, Hammer, DollarSign, TrendingUp, Home as HomeIcon } from "lucide-react";
import heroBg from "@/assets/hero-home.jpg";

interface PropertyData {
  bedrooms: string;
  bathrooms: string;
  livingArea: string;
  grade: string;
  buildYear: string;
  renovationYear: string;
}

interface PredictionResponse {
  prediction: number;
  confidence?: number;
  currency?: string;
  formatted_prediction?: string; // Add this to the interface
}

const RealEstateForm = () => {
  const [formData, setFormData] = useState<PropertyData>({
    bedrooms: "",
    bathrooms: "",
    livingArea: "",
    grade: "",
    buildYear: "",
    renovationYear: "",
  });
  
  const [submitted, setSubmitted] = useState(false);
  const [prediction, setPrediction] = useState<PredictionResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (field: keyof PropertyData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      // Convert form data to numbers for the API
      const payload = {
        bedrooms: parseInt(formData.bedrooms) || 0,
        bathrooms: parseInt(formData.bathrooms) || 0,
        livingArea: parseInt(formData.livingArea) || 0,
        grade: parseInt(formData.grade) || 0,
        buildYear: parseInt(formData.buildYear) || 0,
        renovationYear: parseInt(formData.renovationYear) || 0,
      };

      // Make API call to your FastAPI backend
      const response = await fetch("https://real-estate-lako.onrender.com/predict", { // Update with your actual endpoint
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data: PredictionResponse = await response.json();
      setPrediction(data);
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to get prediction");
      console.error("Prediction error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      bedrooms: "",
      bathrooms: "",
      livingArea: "",
      grade: "",
      buildYear: "",
      renovationYear: "",
    });
    setSubmitted(false);
    setPrediction(null);
    setError(null);
  };

  // Helper function to format currency
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: prediction?.currency || 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Get the formatted prediction value
  const getFormattedPrediction = (): string => {
    if (!prediction) return "";
    
    // Use formatted_prediction if available from backend, otherwise format it ourselves
    return prediction.formatted_prediction || formatCurrency(prediction.prediction);
  };

  const formFields = [
    { key: "bedrooms", label: "Number of Bedrooms", icon: Bed, placeholder: "e.g., 3" },
    { key: "bathrooms", label: "Number of Bathrooms", icon: Bath, placeholder: "e.g., 2" },
    { key: "livingArea", label: "Living Area (sq ft)", icon: Ruler, placeholder: "e.g., 2500" },
    { key: "grade", label: "Grade of the House", icon: Star, placeholder: "e.g., 7" },
    { key: "buildYear", label: "Build Year", icon: Calendar, placeholder: "e.g., 1995" },
    { key: "renovationYear", label: "Renovation Year", icon: Hammer, placeholder: "e.g., 2020" },
  ];

  return (
    <div 
      className="min-h-screen w-full flex items-center justify-center p-4 md:p-8 relative"
      style={{
        backgroundImage: `url(${heroBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-foreground/40 backdrop-blur-[2px]" />
      
      <div className="relative z-10 w-full max-w-2xl animate-fade-in">
        {!submitted ? (
          <Card className="glass-card border-0 shadow-elegant">
            <CardHeader className="text-center pb-2">
              <div className="flex justify-center mb-4">
                <div className="p-3 rounded-full bg-primary/10 border border-primary/20">
                  <Home className="w-8 h-8 text-primary" />
                </div>
              </div>
              <CardTitle className="font-display text-3xl md:text-4xl text-foreground">
                Property Details
              </CardTitle>
              <p className="text-muted-foreground mt-2 font-body">
                Enter your property details for price prediction
              </p>
            </CardHeader>
            
            <CardContent className="pt-6">
              {error && (
                <div className="mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                  <p className="text-destructive text-sm">{error}</p>
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {formFields.map((field, index) => (
                    <div 
                      key={field.key} 
                      className="space-y-2 animate-slide-up"
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      <Label 
                        htmlFor={field.key} 
                        className="text-sm font-medium text-foreground flex items-center gap-2"
                      >
                        <field.icon className="w-4 h-4 text-primary" />
                        {field.label}
                      </Label>
                      <Input
                        id={field.key}
                        type="number"
                        placeholder={field.placeholder}
                        value={formData[field.key as keyof PropertyData]}
                        onChange={(e) => handleInputChange(field.key as keyof PropertyData, e.target.value)}
                        className="input-elegant h-12"
                        required
                        min="0"
                      />
                    </div>
                  ))}
                </div>
                
                <Button 
                  type="submit" 
                  className="btn-primary w-full h-12 text-base font-medium mt-6"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Predicting...
                    </>
                  ) : (
                    "Predict Property Value"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        ) : (
          <Card className="glass-card border-0 shadow-elegant">
            <CardHeader className="text-center pb-2">
              <div className="flex justify-center mb-4">
                <div className="p-3 rounded-full bg-primary/10 border border-primary/20">
                  <TrendingUp className="w-8 h-8 text-primary" />
                </div>
              </div>
              <CardTitle className="font-display text-3xl md:text-4xl text-foreground">
                Property Valuation
              </CardTitle>
              <p className="text-muted-foreground mt-2 font-body">
                Estimated market value based on your inputs
              </p>
            </CardHeader>
            
            <CardContent className="pt-6">
              {/* Prediction Result Card */}
              {prediction && (
                <div className="mb-8 p-6 bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-xl animate-fade-in">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-full bg-primary/20">
                        <DollarSign className="w-8 h-8 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground uppercase tracking-wider">
                          Estimated Value
                        </p>
                        <p className="text-4xl font-bold text-foreground mt-1">
                          {getFormattedPrediction()}
                        </p>
                      </div>
                    </div>
                    
                    {prediction.confidence && (
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">Confidence Level</p>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="w-32 bg-muted rounded-full h-2">
                            <div 
                              className="bg-green-500 h-2 rounded-full" 
                              style={{ width: `${Math.min(prediction.confidence, 100)}%` }}
                            />
                          </div>
                          <span className="font-semibold text-foreground">
                            {prediction.confidence.toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Property Summary */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <HomeIcon className="w-5 h-5" />
                  Property Summary
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {formFields.map((field, index) => (
                    <div 
                      key={field.key}
                      className="result-card p-4 rounded-lg animate-slide-up"
                      style={{ animationDelay: `${index * 0.08}s` }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <field.icon className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground uppercase tracking-wide">
                            {field.label}
                          </p>
                          <p className="text-lg font-semibold text-foreground">
                            {formData[field.key as keyof PropertyData] || "—"}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mt-8">
                <Button 
                  onClick={handleReset} 
                  variant="outline"
                  className="flex-1 h-12 text-base font-medium border-primary/30 hover:bg-primary/10 hover:border-primary/50 transition-all"
                >
                  Analyze Another Property
                </Button>
                <Button 
                  onClick={() => {
                    // Optional: Add share or save functionality
                    console.log("Saving prediction...");
                  }}
                  className="flex-1 h-12 text-base font-medium bg-green-600 hover:bg-green-700"
                >
                  Save This Estimate
                </Button>
              </div>

              {/* Disclaimer */}
              <p className="text-xs text-muted-foreground text-center mt-6">
                This is an AI-powered estimate based on historical data. 
                Actual market value may vary. Consult with a real estate professional for a formal appraisal.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default RealEstateForm;