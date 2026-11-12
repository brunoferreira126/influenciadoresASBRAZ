export type Influencer={id:string;name:string;slug:string;instagram:string;phone:string;commissionCents:number;active:boolean;createdAt:string;clicks:number;whatsapps:number};
export type Settings={title:string;location:string;originalPriceCents:number;discountPercent:number;whatsappNumber:string;description:string};
export type Dashboard={influencers:Influencer[];settings:Settings;totals:{clicks:number;whatsapps:number}};
