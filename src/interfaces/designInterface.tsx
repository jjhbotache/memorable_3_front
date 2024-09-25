import Tag from "./tagInterface";

export default interface Design {
  id: number;
  name: string;
  ai_url: string;
  img_url: string;
  tags: Tag[];
  loved: boolean;
  addedtocart: boolean;
}