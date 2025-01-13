export interface getHouseList {
  datas: HouseList[];
  query: QueryHouse;
  loading: boolean;
  paginate: paginateHouse;
}

export interface HouseList {
  id: string;
  house_name: string;
  house_type: string;
  zone: Zone;
  sell_type: string;
  size: number;
  amenity: Amenity[];
  floor: number;
  price: number;
  number_of_rooms: number;
  number_of_bathrooms: number;
  water_rate: number;
  electricity_rate: number;
  description: string;
  address: string;
  location_latitute: number;
  location_longitute: number;
  is_recommend: boolean;
  images_main: ImagesMain[];
  images: Image[];
  contact_info: ContactInfo;
}

export interface Zone {
  id: string;
  zone_name: string;
}

export interface Amenity {
  id: string;
  name: string;
}

export interface Image {
  id: string;
  url: string;
  type: string;
}

export interface ImagesMain {
  id: string;
  url: string;
  type: string;
}

export interface ContactInfo {
  first_name: string;
  last_name: string;
  phone_number: string;
  line_id: string;
}

export interface UpdateHouse {
  house_name: string;
  number_of_rooms: number;
  number_of_bathrooms: number;
  location_latitute: number;
  location_longitute: number;
  electricity_rate: number;
  water_rate: number;
  floor: number;
  size: number;
  zone_id: number;
  description: string;
  house_type: string;
  sell_type: string;
  amentity_id: AmentityId[];
  images_main: imagesMain[];
  images: string[];
  address: string;
  item_detail: string[];
  contact_info: ContactInfo;
  price: number;
}

export interface imagesMain {
  id: string;
  url: string;
  type: string;
}

export interface QueryHouse {
  from: number;
  size: number;
  search_by_name: string;
}

export interface paginateHouse {
  from: number;
  size: number;
  total: number;
}

export interface fromCreateHouse {
  house_name: string;
  house_type: string;
  zone_id: number;
  sell_type: string;
  amentity_id: AmentityId[];
  size: number;
  floor: number;
  price: number;
  number_of_rooms: number;
  number_of_bathrooms: number;
  water_rate: number;
  electricity_rate: number;
  description: string;
  phone_number: string;
  location_latitute: number;
  location_longitute: number;
  is_recommend: boolean;
  images_main: string[];
  images: string[];
  first_name: string;
  last_name: string;
  line_id: string;
  address: string;
}

interface AmentityId {
  id: string;
  name: string;
}

export interface getHouseID {
  datas: HouseID;
  loading: boolean;
}

export interface HouseID {
  id: string;
  house_name: string;
  house_type: string;
  zone: Zone;
  sell_type: string;
  size: number;
  amenity: Amenity[];
  floor: number;
  price: number;
  number_of_rooms: number;
  number_of_bathrooms: number;
  water_rate: number;
  electricity_rate: number;
  description: string;
  address: string;
  location_latitute: number;
  location_longitute: number;
  is_recommend: boolean;
  images_main: ImagesMain;
  images: Image[];
  contact_info: ContactInfo;
}

export interface ImagesMain {
  id: string;
  url: string;
  type: string;
}
