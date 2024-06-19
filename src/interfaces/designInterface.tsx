import Tag from "./tagInterface";

export default interface Desing {
  id: number;
  name: string;
  ai_url: string;
  img_url: string;
  tags: Tag[];
  loved?: boolean;
}