
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
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";


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
  const { control } = useFormContext();

  return (
    <Card className="max-w-2xl mx-auto border-2 border-primary/10 bg-card/50">
        <CardHeader>
            <CardTitle>Describe Your Land</CardTitle>
            <CardDescription>Provide details about your farmland for a more accurate prediction.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
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
                    <Select onValueahange={field.onChange} value={field.value}>
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
        </CardContent>
    </Card>
  );
}
