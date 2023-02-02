import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  private _Base_URL = 'https://staging.bazarcenter.ca/api/';

  getCountries() {
    return this.http.get(this._Base_URL+'country/'+'countries');
  }

  getPromotionCountry() {
    return this.http.get(this._Base_URL+'country/'+'promotion');
  }

  getCategories() {
    return this.http.get(this._Base_URL+'category/'+'allcategory');
  }

  getParentCategories() {
    return this.http.get(this._Base_URL+'category/'+'parentcategory');
  }

  getStates(id:any) {
    return this.http.get(this._Base_URL+'country/'+'state?country_id='+ id);
  }

  getCities(id:any) {
    return this.http.get(this._Base_URL+'country/'+'city?state_id='+ id);
  }

  sendVendorEmail(vendorRegStep1: any) {
    return this.http.post(this._Base_URL+'brand/register', vendorRegStep1);
  }

  vendorRegistrationStep1(vendorRegStep1:any) {
    return this.http.post(this._Base_URL+'brand/create' , vendorRegStep1);
  }

  vendorSignIn(signInData:any) {
    return this.http.post(this._Base_URL+'user/'+'login' , signInData);
  }

  getVendorDetails(id:any) {
    return this.http.get(this._Base_URL+'brand/edit/'+id);
  }

  getAccountDetails(id:any) {
    return this.http.get(this._Base_URL+'user/'+'brand/edit/'+id);
  }

  userAccountUpdate(data:any) {
    return this.http.post(this._Base_URL+'brand/update-account' , data);
  }

  updateVendorDetails(updatedData:any) {
    return this.http.post(this._Base_URL+'brand/update-shop' , updatedData);
  }

  getProducts(id:any) {
    return this.http.get(this._Base_URL+'brandproduct/'+'fetchproductbyvendor?user_id='+id);
  }

  getInventoryProducts(id:any, page: any, status: any, search_key: any) {
    return this.http.get(this._Base_URL+'brandproduct/'+'fetch-products?user_id='+id+'&page='+page+'&status='+status+'&search_key='+search_key);
  }

  fetchProductsByShop(id:any , sort_key: any, slug: any ) {
    return this.http.get(this._Base_URL+'shop/products?brand_id='+id+'&sort_key='+sort_key+'&sort_cat='+slug);
  }

  getSortProducts(id:any, sort_key: any, page: any, status: any, search_key: any) {
    return this.http.get(this._Base_URL+'brandproduct/'+'fetchproductbysort?user_id='+id+'&sort_key='+sort_key+'&page='+page+'&status='+status+'&search_key='+search_key);
  }

  getProductDetail(id:any) {
    return this.http.get(this._Base_URL+'brandproduct/'+'productdetails?id='+id);
  }

  getBrandShopDetails(id:any) {
    return this.http.get(this._Base_URL+'shop/'+'brand/'+id);
  }

  importWordpress(user_id:any , consumer_key:any, website_url:any , consumer_secret:any) {
    return this.http.get(this._Base_URL+'wordpress/'+'importwordpress?user_id='+user_id+'&consumer_key='+consumer_key+'&website='+website_url+'&consumer_secret='+consumer_secret);
  }

  importShopify(user_id:any , api_key:any, api_password:any , store_url:any) {
    return this.http.get(this._Base_URL+'shopify/'+'importshopify?user_id='+user_id+'&api_key='+api_key+'&api_password='+api_password+'&store_url='+store_url+'.myshopify.com');
  }

  deleteProduct(id:any){
    return this.http.get(this._Base_URL+'product/deleteproduct?id='+id);
  }

  updateProduct(id:any , status:any) {
    return this.http.get(this._Base_URL+'product/statusproduct?id='+id+'&status='+status);
  }

  arrangeProducts(products:any) {
    return this.http.post(this._Base_URL+'product/productsreorder' , products);
  }

  createProduct(values:any) {
    return this.http.post(this._Base_URL+'product/create' , values);
  }

  editProduct(values:any) {
    return this.http.post(this._Base_URL+'product/updateproduct' , values);
  }

  deleteProductImage(id:any) {
    return this.http.get(this._Base_URL+'product/deleteproductimage?image_id='+id);
  }

  deleteProductVideo(id:any) {
    return this.http.get(this._Base_URL+'product/deleteproductvideo?id='+id);
  }

  getSyncList(user_id: any) {
    return this.http.get(this._Base_URL+'brandproduct/'+'synclist?user_id='+user_id);
  }

  updateSync(id:any) {
    return this.http.get(this._Base_URL+'shopify/'+'syncall?id='+id);
  }

  updateStock(values:any) {
    return this.http.post(this._Base_URL+'product/update-products-stock' , values);
  }

  bulkUpload(values:any) {
    return this.http.post(this._Base_URL+'importexport/'+'import' , values);
  }

  downloadExistCatalog(id:any) {
    return this.http.get(this._Base_URL+'importexport/'+'export?user_id='+id);
  }

  retailerRegistration(values:any) {
    return this.http.post(this._Base_URL+'retailer/register', values);
  }

  fetchProductDetails(id:any, user_id: any) {
    return this.http.get(this._Base_URL+'shop/product?id='+id+'&user_id='+user_id);
  }
  
  vendorGoLive(values:any) {
    return this.http.post(this._Base_URL+'brand/golive' , values);
  }
  
  addToCart(values:any) {
    return this.http.post(this._Base_URL+'cart/add' , values);
  }

  fetchCart(user_id: any) {
    return this.http.get(this._Base_URL+'cart/fetch/'+user_id);
  }
    
  updateCart(values:any) {
    return this.http.post(this._Base_URL+'cart/update' , values);
  }
    
  deleteCart(id:any) {
    return this.http.get(this._Base_URL+'cart/delete/'+id);
  }

  convertPrice(price: any) {
    return this.http.get(this._Base_URL+'product/convertprice/'+price);
  }

  syncToShopify(id: any, user_id: any, website: any) {
    return this.http.get(this._Base_URL+'shopify/'+'synctoshopify?product_id='+id+'&user_id='+user_id+'&website='+website);
  }

  syncToWordpress(id: any, user_id: any, website: any) { 
    return this.http.get(this._Base_URL+'wordpress/'+'synctowordpress?user_id='+user_id+'&website='+website+'&product_id='+id);
  }

  verifyEmail(token: any) {
    return this.http.get(this._Base_URL+'user/email-verify/'+token);
  }

  resendVerifyEmail(user_id: any) {
    return this.http.get(this._Base_URL+'user/resend-verifyemail/'+user_id);
  }

  placeOrder(values:any) {
    return this.http.post(this._Base_URL+'orders' , values);
  }

  fetchBrands(user_id: any) {
    return this.http.get(this._Base_URL+'brand/all/'+user_id);
  }

  fetchOrders(user_id: any,page: any, status: any, search_key: any) {
    return this.http.get(this._Base_URL+'orders?user_id='+user_id+'&page='+page+'&status='+status+'&search_key='+search_key)
  }

  orderDetails(order_no: any) {
    // return this.http.get(this._Base_URL+'brand/order/' + order_no);
    return this.http.get(this._Base_URL+'orders/' + order_no);
  }

  brandShipFrom(values:any) {
    return this.http.post(this._Base_URL+'orders/accept' , values);
  }

  orderMultiple(values:any) {
    return this.http.post(this._Base_URL+'orders/packing-slip' , values);
  }
  
  downloadCsv(user_id: any,values: any) {
    return this.http.get(this._Base_URL+'orders/csv?brand_id=' + user_id + '&order_id=' + values);
  }

  sendResetEmail(values:any) {
    return this.http.post(this._Base_URL+'user/forget-password' , values);
  }

  resetPassword(values:any) {
    return this.http.post(this._Base_URL+'user/reset-password' , values);
  }

  changeEditShipOrder(values:any) {
    return this.http.post(this._Base_URL+'orders/change-date' , values);
  }

  cancelOrder(values:any) {
    return this.http.post(this._Base_URL+'orders/cancel' , values);
  }

  splitOrder(values:any) {
    return this.http.post(this._Base_URL+'orders/split' , values);
  }

  updateOrder(values:any) {
    return this.http.post(this._Base_URL+'orders/update' , values);
  }

  wordpressSync(id: any) {
    return this.http.get(this._Base_URL+'wordpress/'+'wordpresssync?id='+id);
  }
  
  changeAddress(values:any) {
    return this.http.post(this._Base_URL+'orders/change-address' , values);
  }

  getRetailerDetails(id: any) {
    return this.http.get(this._Base_URL+'retailer/edit/'+id);
  }

  updateRetailerDetails(values: any) {
    return this.http.post(this._Base_URL+'retailer/update-account', values);
  }

  retailerOrders(id:any, page: any, status: any) {
    return this.http.get(this._Base_URL+'orders?user_id='+id+'&page='+page+'&status='+status);
  }

  fetchWishlist(id:any) {
    return this.http.get(this._Base_URL+'wishlist/fetch/'+id);
  }

  addToWishlist(values: any) {
    return this.http.post(this._Base_URL+'wishlist/add', values);
  }

  deleteWishlist(values:any) {
    return this.http.post(this._Base_URL+'wishlist/delete',values);
  }

  addBoardWishlist(values: any) {
    return this.http.post(this._Base_URL+'wishlist/add-board', values);
  }

  updateBoardWishlist(values: any) {
    return this.http.post(this._Base_URL+'wishlist/update-board', values);
  }

  deleteBoardWishlist(values: any) {
    return this.http.post(this._Base_URL+'wishlist/delete-board', values);
  }

  fetchBoardWishlist(key: any) {
    return this.http.get(this._Base_URL+'wishlist/fetch-board/'+key);
  }

  fetchBoards(user_id: any) {
    return this.http.get(this._Base_URL+'wishlist/fetch-boards/'+user_id);
  }

  changeBoardWishlist(values: any) {
    return this.http.post(this._Base_URL+'wishlist/change-board', values);
  }

  fetchCustomers(user_id: any,page: any, status: any, search_key: any, sort_key: any) {
    return this.http.get(this._Base_URL+'customers?user_id='+user_id+'&page='+page+'&status='+status+'&search_key='+search_key+'&sort_key='+sort_key);
  }
  
  addCustomers(values: any) {
    return this.http.post(this._Base_URL+'customers', values);
  }
  
  customerDetail(key: any) {
    return this.http.get(this._Base_URL+'customers/'+ key);
  }
  
  uploadCsvCustomers(values: any) {
    return this.http.post(this._Base_URL+'customers/import', values);
  }

  fetchCampaigns(user_id: any, status:any) {
    return this.http.get(this._Base_URL+'campaigns?user_id='+user_id+'&status='+status);
  }

  addCampaigns(values: any) {
    return this.http.post(this._Base_URL+'campaigns',values);
  }

  campaignsDetail(key: any) {
    return this.http.get(this._Base_URL+'campaigns/'+key);
  }

  updateCampaigns(values: any) {
    return this.http.post(this._Base_URL+'campaigns/update',values);
  }

  deleteCampaigns(key: any) {
    return this.http.get(this._Base_URL+'campaigns/delete/'+ key);
  }

  addPromotion(values: any) {
    return this.http.post(this._Base_URL+'promotions',values);
  }

  fetchPromotions(user_id: any) {
    return this.http.get(this._Base_URL+'promotions?user_id='+user_id);
  }
  
  promotionDetail(key: any) {
    return this.http.get(this._Base_URL+'promotions/'+key);
  }
  
  updatePromotions(values: any) {
    return this.http.post(this._Base_URL+'promotions/update',values);
  }
  
  updateCustomer(values: any) {
    return this.http.post(this._Base_URL+'customers/update',values);
  }
  
  deleteCustomer(values: any) {
    return this.http.post(this._Base_URL+'customers/delete',values);
  }

  exportCsvCustomers(values: any) {
    return this.http.post(this._Base_URL+'customers/export', values);
  }


}
