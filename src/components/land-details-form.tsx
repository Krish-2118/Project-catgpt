
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
import type { Language } from "@/app/page";


export const landDetailsSchema = z.object({
  district: z.string().min(1, "Please select a district."),
  soilType: z.string().min(1, "Please select a soil type."),
  irrigationSource: z.string().min(1, "Please select an irrigation source."),
  topography: z.string().min(1, "Please select the topography."),
});

export type LandDetailsValues = z.infer<typeof landDetailsSchema>;

export default function LandDetailsForm({ language, locales }: { language: Language, locales: any }) {
  const { control } = useFormContext();
  const t = locales[language].form.land;

  const odishaDistricts = t.districts;
  const soilTypes = t.soilTypes;
  const irrigationSources = t.irrigationSources;
  const topographies = t.topographies;

  return (
    <Card className="max-w-2xl mx-auto border-2 border-primary/10 bg-card/50">
        <CardHeader>
            <CardTitle>{t.formTitle}</CardTitle>
            <CardDescription>{t.formDescription}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                control={control}
                name="landDetails.district"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>{t.district}</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                        <SelectTrigger>
                            <SelectValue placeholder="Select a district" />
                        </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                        {odishaDistricts.map((d: { value: string, label: string}) => <SelectItem key={d.value} value={d.value}>{d.label}</SelectItem>)}
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
                    <FormLabel>{t.soilType}</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                        <SelectTrigger>
                            <SelectValue placeholder="Select soil type" />
                        </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                        {soilTypes.map((s: { value: string, label: string}) => <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>)}
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
                    <FormLabel>{t.irrigationSource}</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                        <SelectTrigger>
                            <SelectValue placeholder="Select irrigation source" />
                        </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            {irrigationSources.map((i: { value: string, label: string}) => <SelectItem key={i.value} value={i.value}>{i.label}</SelectItem>)}
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
                    <FormLabel>{t.topography}</FormLabel>
                    <Select onValuecha
                    nge={field.onChange} value={field.value}>
                        <FormControl>
                        <SelectTrigger>
                            <SelectValue placeholder="Select topography" />
                        </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                        {topographies.map((t: { value: string, label: string}) => <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>)}
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
