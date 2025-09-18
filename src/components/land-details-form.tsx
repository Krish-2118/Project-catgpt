
"use client";

import { useFormContext } from "react-hook-form";
import { z } from "zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "./ui/button";
import { MapPin, Loader2 } from "lucide-react";
import { useState } from "react";


export const landDetailsSchema = z.object({
  district: z.string().min(1, "Please select a district."),
  soilType: z.string().min(1, "Please select a soil type."),
  irrigationSource: z.string().min(1, "Please select an irrigation source."),
  topography: z.string().min(1, "Please select the topography."),
});

export type LandDetailsValues = z.infer<typeof landDetailsSchema>;

const odishaDistricts = [
    "Angul", "Balangir", "Balasore", "Bargarh", "Bhadrak", "Boudh", "Cuttack", "Deogarh",
    "Dhenkanal", "Gajapati", "Ganjam", "Jagatsinghpur", "Jajpur", "Jharsuguda", "Kalahandi",
    "Kandhamal", "Kendrapara", "Keonjhar", "Khordha", "Koraput", "Malkangiri", "Mayurbhanj",
    "Nabarangpur", "Nayagarh", "Nuapada", "Puri", "Rayagada", "Sambalpur", "Subarnapur", "Sundargarh"
];
const soilTypes = ["Alluvial", "Red", "Laterite", "Black", "Sandy Loam", "Clayey"];
const irrigationSources = ["Canal", "Borewell/Tubewell", "River Lift", "Pond", "Rain-fed"];
const topographies = ["Plains", "Hilly/Undulating", "Coastal/Deltaic", "Plateau"];


export default function LandDetailsForm() {
  const { control, setValue } = useFormContext();
  const [isLocating, setIsLocating] = useState(false);

  const handleUseLocation = () => {
    setIsLocating(true);
    // Simulate getting location and reverse geocoding
    setTimeout(() => {
      // In a real app, you'd use navigator.geolocation and a reverse geocoding API
      const randomDistrict = odishaDistricts[Math.floor(Math.random() * odishaDistricts.length)];
      setValue("landDetails.district", randomDistrict.toLowerCase(), { shouldValidate: true });
      setIsLocating(false);
    }, 1000);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 p-6 bg-card rounded-lg border">
       <div className="flex justify-end">
        <Button type="button" variant="outline" size="sm" onClick={handleUseLocation} disabled={isLocating}>
          {isLocating ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <MapPin className="mr-2 h-4 w-4" />
          )}
          Use My Location
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={control}
          name="landDetails.district"
          render={({ field }) => (
            <FormItem>
              <FormLabel>District</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a district" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {odishaDistricts.map(d => <SelectItem key={d} value={d.toLowerCase()}>{d}</SelectItem>)}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={control}
          name="landDetails.soilType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Predominant Soil Type</FormLabel>
               <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select soil type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                   {soilTypes.map(s => <SelectItem key={s} value={s.toLowerCase()}>{s}</SelectItem>)}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="landDetails.irrigationSource"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Primary Irrigation Source</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select irrigation source" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {irrigationSources.map(i => <SelectItem key={i} value={i.toLowerCase()}>{i}</SelectItem>)}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="landDetails.topography"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Land Topography</FormLabel>
               <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select topography" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {topographies.map(t => <SelectItem key={t} value={t.toLowerCase()}>{t}</SelectItem>)}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
