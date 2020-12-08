import ApiUtils from "./api";
class Api {
  /*
   * example
   * body:
   *   name: Bayu
   *   age: 21
   * */
  postProcessAge = (body) => ApiUtils.post("/process/age", body);
}
export default new Api();
