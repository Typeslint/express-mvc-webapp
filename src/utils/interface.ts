declare module "express-session" {
    export interface SessionData {
        username: string;
    }
}

export interface userData {
    id: number | null;
    username: string;
    password: string;
    email: string;
    alamat: string;
    telp: string;
}

export interface userOrder {
    tanggal: Date;
    id: number | null;
    username: string;
    name: string;
    phone: string;
    address: string;
    qty: string | number;
    services: {
        service: string;
        delivery: string;
    };
    total: string | number;
}

export interface userMembership {
    id: number | null;
    username: string;
    is_member: boolean;
    type: string;
}

export interface uploadPhotoProfile {
    photo: string;
    backgroundPhoto: string;
}
