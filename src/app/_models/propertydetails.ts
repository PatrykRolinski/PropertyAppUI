export interface PropertyDetails{
    description: string,
    originalPrice: number,
     price:number,
    propertyType: string,
    propertySize: string,
  numberOfRooms: number,
  propertyStatus: string,
  marketType: string,
  closedKitchen: true,
  country: string,
  city: string,
  street: string,
  floor: number,
  mainPhotoUrl: string,
  photos: [
    {
      id: number,
      url: string
    }
  ]
}