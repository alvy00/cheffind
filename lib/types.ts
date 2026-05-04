export interface Chef {
    id: number;
    name: string;
    cuisineSpeciality: string;
    experience: string;
    speciality: string;
    rating: number;
    pricePerSession: number;
    opinion: string;
}

export interface FieldProps {
    label: string;
    children: React.ReactNode;
    error?: string;
}
