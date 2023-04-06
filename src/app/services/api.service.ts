import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient, private storage: StorageMap ) {}

  private _Base_URL = environment.apiUrl;

  createAuthorizationHeader() {
    var my_object = JSON.parse(JSON.stringify(localStorage.getItem('authorization_data')));
    if(JSON.parse(my_object) != null ) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${JSON.parse(my_object).token}`
      }); 
      const requestOptions = { headers: headers };
      return requestOptions;
    } else return;
  }
  constructor(private http: HttpClient) {}

  private _Base_URL = 'https://staging.bazarcenter.ca/api/';

  getCountries() {
    return this.http.get(this._Base_URL+'country/'+'countries');
  }

  getPromotionCountry() {
    return this.http.get(this._Base_URL+'country/'+'promotion');
  }

  getCategories() {
    return this.http.get(this._Base_URL+'category/'+'product-categories');
  }

  getParentCategories() {
    return this.http.get(this._Base_URL+'category/'+'parent-categories');
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
    return this.http.post(this._Base_URL+'brands', vendorRegStep1);
  }

  vendorRegistrationStep1(vendorRegStep1:any) {
    return this.http.put(this._Base_URL+'brands/update' , vendorRegStep1);
    return this.http.post(this._Base_URL+'brand/register', vendorRegStep1);
  }

  vendorRegistrationStep1(vendorRegStep1:any) {
    return this.http.post(this._Base_URL+'brand/create' , vendorRegStep1);
  }

  vendorSignIn(signInData:any) {
    return this.http.post(this._Base_URL+'user/'+'login' , signInData);
  }

  getVendorDetails(id:any) {
    return this.http.get(this._Base_URL+'brands/'+id , this.createAuthorizationHeader());
  }

  getAccountDetails(id:any) {
    return this.http.get(this._Base_URL+'user/brand/edit/'+id, this.createAuthorizationHeader());
  }

  userAccountUpdate(data:any) {
    return this.http.put(this._Base_URL+'brands/update/account' , data, this.createAuthorizationHeader());
  }

  updateVendorDetails(updatedData:any) {
    return this.http.put(this._Base_URL+'brands/update/shop' , updatedData, this.createAuthorizationHeader());
  }

  getProducts() {
    return this.http.get(this._Base_URL+'product/'+'arrange', this.createAuthorizationHeader());
  }

  getInventoryProducts(id:any, page: any, status: any, search_key: any) {
    return this.http.get(this._Base_URL+'product/'+'fetch-stock?page='+page+'&status='+status+'&search_key='+search_key, this.createAuthorizationHeader());
  }

  fetchProductsByShop(values: any ) {
    return this.http.post(this._Base_URL+'shop/brand-products', values, this.createAuthorizationHeader());
  }

  getSortProducts(id:any, sort_key: any, page: any, status: any, search_key: any) {
    return this.http.get(this._Base_URL+'product/'+'fetch?sort_key='+sort_key+'&page='+page+'&status='+status+'&search_key='+search_key, this.createAuthorizationHeader());
  }

  getProductDetail(id:any) {
    return this.http.get(this._Base_URL+'product/'+'details?id='+id, this.createAuthorizationHeader());
  }

  getBrandShopDetails(key:any) {
    return this.http.get(this._Base_URL+'brands/shop/'+key, this.createAuthorizationHeader());
  }

  importWordpress(user_id:any , consumer_key:any, website_url:any , consumer_secret:any) {
    return this.http.get(this._Base_URL+'wordpress/'+'importwordpress?user_id='+user_id+'&consumer_key='+consumer_key+'&website='+website_url+'&consumer_secret='+consumer_secret, this.createAuthorizationHeader());
  }

  importShopify(user_id:any , api_key:any, api_password:any , store_url:any) {
    return this.http.get(this._Base_URL+'shopify/'+'importshopify?user_id='+user_id+'&api_key='+api_key+'&api_password='+api_password+'&store_url='+store_url+'.myshopify.com', this.createAuthorizationHeader());
  }

  deleteProduct(values:any){
    return this.http.post(this._Base_URL+'product/delete' ,values, this.createAuthorizationHeader());
  }

  updateProduct(values:any) {
    return this.http.post(this._Base_URL+'product/status', values, this.createAuthorizationHeader());
  }

  arrangeProducts(products:any) {
    return this.http.post(this._Base_URL+'product/reorder' , products, this.createAuthorizationHeader());
  }

  createProduct(values:any) {
    return this.http.post(this._Base_URL+'product/create' , values, this.createAuthorizationHeader());
  }

  editProduct(values:any) {
    return this.http.post(this._Base_URL+'product/update' , values, this.createAuthorizationHeader());
  }

  deleteProductImage(values:any) {
    return this.http.post(this._Base_URL+'product/delete-image',values, this.createAuthorizationHeader());
  }

  deleteProductVideo(values:any) {
    return this.http.post(this._Base_URL+'product/delete-video',values, this.createAuthorizationHeader());
  }

  getSyncList(user_id: any) {
    return this.http.get(this._Base_URL+'brandproduct/'+'synclist?user_id='+user_id, this.createAuthorizationHeader());
  }

  updateSync(id:any) {
    return this.http.get(this._Base_URL+'shopify/'+'syncall?id='+id, this.createAuthorizationHeader());
  }

  updateStock(values:any) {
    return this.http.post(this._Base_URL+'product/update-stock' , values, this.createAuthorizationHeader());
  }

  bulkUpload(values:any) {
    return this.http.post(this._Base_URL+'importexport/'+'import-products' , values, this.createAuthorizationHeader());
  }

  downloadExistCatalog(id:any) {
    return this.http.get(this._Base_URL+'importexport/'+'export-products?user_id='+id, this.createAuthorizationHeader());
  }

  retailerRegistration(values:any) {
    return this.http.post(this._Base_URL+'retailers', values);
  }

  fetchProductDetails(id:any, user_id: any) {
    return this.http.get(this._Base_URL+'shop/product?id='+id, this.createAuthorizationHeader());
  }
  
  vendorGoLive(values:any) {
    return this.http.post(this._Base_URL+'brands/shop/live' , values, this.createAuthorizationHeader());
  }
  
  addToCart(values:any) {
    return this.http.post(this._Base_URL+'carts/add' , values, this.createAuthorizationHeader());
  }

  fetchCart() {
    return this.http.get(this._Base_URL+'carts/fetch', this.createAuthorizationHeader());
  }
    
  updateCart(values:any) {
    return this.http.post(this._Base_URL+'carts/update' , values, this.createAuthorizationHeader());
  }
    
  deleteCart(values:any) {
    return this.http.post(this._Base_URL+'carts/delete',values, this.createAuthorizationHeader());
  }

  convertPrice(price: any) {
    return this.http.get(this._Base_URL+'product/convert-price/'+price, this.createAuthorizationHeader());
  }

  syncToShopify(id: any, user_id: any, website: any) {
    return this.http.get(this._Base_URL+'shopify/'+'synctoshopify?product_id='+id+'&user_id='+user_id+'&website='+website, this.createAuthorizationHeader());
  }

  syncToWordpress(id: any, user_id: any, website: any) { 
    return this.http.get(this._Base_URL+'wordpress/'+'synctowordpress?user_id='+user_id+'&website='+website+'&product_id='+id, this.createAuthorizationHeader());
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
    return this.http.post(this._Base_URL+'orders' , values, this.createAuthorizationHeader());
  }

  fetchBrands(user_id: any) {
    return this.http.get(this._Base_URL+'brands', this.createAuthorizationHeader());
  }

  fetchOrders(user_id: any,page: any, status: any, search_key: any) {
    return this.http.get(this._Base_URL+'orders?page='+page+'&status='+status+'&search_key='+search_key, this.createAuthorizationHeader())
  }

  orderDetails(values: any) {
    return this.http.get(this._Base_URL+'orders/details/' + values.order_number, this.createAuthorizationHeader());
  }

  brandShipFrom(values:any) {
    return this.http.post(this._Base_URL+'orders/accept' , values, this.createAuthorizationHeader());
  }

  orderMultiple(values:any) {
    return this.http.post(this._Base_URL+'orders/packing-slip' , values, this.createAuthorizationHeader());
  }
  
  downloadCsv(user_id: any,values: any) {
    return this.http.get(this._Base_URL+'orders/csv?brand_id=' + user_id + '&order_id=' + values, this.createAuthorizationHeader());
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
    return this.http.post(this._Base_URL+'orders/change-date' , values, this.createAuthorizationHeader());
  }

  cancelOrder(values:any) {
    return this.http.post(this._Base_URL+'orders/cancel' , values, this.createAuthorizationHeader());
  }

  splitOrder(values:any) {
    return this.http.post(this._Base_URL+'orders/split' , values, this.createAuthorizationHeader());
  }

  updateOrder(values:any) {
    return this.http.post(this._Base_URL+'orders/update' , values, this.createAuthorizationHeader());
  }

  wordpressSync(id: any) {
    return this.http.get(this._Base_URL+'wordpress/'+'wordpresssync?id='+id, this.createAuthorizationHeader());
  }
  
  changeAddress(values:any) {
    return this.http.post(this._Base_URL+'orders/change-address' , values, this.createAuthorizationHeader());
  }

  getRetailerDetails(key: any) {
    return this.http.get(this._Base_URL+'retailers/' + key, this.createAuthorizationHeader());
  }

  updateRetailerDetails(values: any) {
    return this.http.put(this._Base_URL+'retailers/'+ values.user_key, values, this.createAuthorizationHeader());
  }

  retailerOrders(id:any, page: any, status: any) {
    return this.http.get(this._Base_URL+'orders?page='+page+'&status='+status, this.createAuthorizationHeader());
  }

  fetchWishlist() {
    return this.http.get(this._Base_URL+'wishlist/fetch', this.createAuthorizationHeader());
  }

  addToWishlist(values: any) {
    return this.http.post(this._Base_URL+'wishlist/add', values, this.createAuthorizationHeader());
  }

  deleteWishlist(values:any) {
    return this.http.post(this._Base_URL+'wishlist/delete',values, this.createAuthorizationHeader());
  }

  addBoardWishlist(values: any) {
    return this.http.post(this._Base_URL+'wishlist/add-board', values, this.createAuthorizationHeader());
  }

  updateBoardWishlist(values: any) {
    return this.http.post(this._Base_URL+'wishlist/update-board', values, this.createAuthorizationHeader());
  }

  deleteBoardWishlist(values: any) {
    return this.http.post(this._Base_URL+'wishlist/delete-board', values, this.createAuthorizationHeader());
  }

  fetchBoardWishlist(key: any) {
    return this.http.get(this._Base_URL+'wishlist/fetch-board/'+key, this.createAuthorizationHeader());
  }

  fetchBoards() {
    return this.http.get(this._Base_URL+'wishlist/fetch-boards', this.createAuthorizationHeader());
  }

  changeBoardWishlist(values: any) {
    return this.http.post(this._Base_URL+'wishlist/change-board', values, this.createAuthorizationHeader());
  }

  fetchCustomers(user_id: any,page: any, status: any, search_key: any, sort_key: any) {
    return this.http.get(this._Base_URL+'customers?user_id='+user_id+'&page='+page+'&status='+status+'&search_key='+search_key+'&sort_key='+sort_key, this.createAuthorizationHeader());
  }
  
  addCustomers(values: any) {
    return this.http.post(this._Base_URL+'customers', values, this.createAuthorizationHeader());
  }
  
  customerDetail(key: any) {
    return this.http.get(this._Base_URL+'customers/'+ key, this.createAuthorizationHeader());
  }
  
  uploadCsvCustomers(values: any) {
    return this.http.post(this._Base_URL+'customers/import', values, this.createAuthorizationHeader());
  }

  fetchCampaigns(user_id: any, status:any) {
    return this.http.get(this._Base_URL+'campaigns?user_id='+user_id+'&status='+status, this.createAuthorizationHeader());
  }

  addCampaigns(values: any) {
    return this.http.post(this._Base_URL+'campaigns', values, this.createAuthorizationHeader());
  }

  campaignsDetail(key: any) {
    return this.http.get(this._Base_URL+'campaigns/'+key, this.createAuthorizationHeader());
  }

  updateCampaigns(values: any) {
    return this.http.post(this._Base_URL+'campaigns/update',values, this.createAuthorizationHeader());
  }

  deleteCampaigns(key: any) {
    return this.http.delete(this._Base_URL+'campaigns/delete/'+ key, this.createAuthorizationHeader());
  }

  addPromotion(values: any) {
    return this.http.post(this._Base_URL+'promotions',values, this.createAuthorizationHeader());
  }

  fetchPromotions(user_id: any) {
    return this.http.get(this._Base_URL+'promotions?user_id='+user_id, this.createAuthorizationHeader());
  }
  
  promotionDetail(key: any) {
    return this.http.get(this._Base_URL+'promotions/'+key, this.createAuthorizationHeader());
  }
  
  updatePromotions(values: any) {
    return this.http.post(this._Base_URL+'promotions/update',values, this.createAuthorizationHeader());
  }
  
  deletePromotions(values: any) {
    return this.http.post(this._Base_URL+'promotions/delete',values, this.createAuthorizationHeader());
  }
  
  updateCustomer(values: any) {
    return this.http.post(this._Base_URL+'customers/update',values, this.createAuthorizationHeader());
  }
  
  deleteCustomer(values: any) {
    return this.http.post(this._Base_URL+'customers/delete',values, this.createAuthorizationHeader());
  }

  exportCsvCustomers(values: any) {
    return this.http.post(this._Base_URL+'customers/export', values, this.createAuthorizationHeader());
  }

  createShippingAddress(values: any) {
    return this.http.post(this._Base_URL+'shippings/create', values, this.createAuthorizationHeader());
  }

  getShippingAddress() {
    return this.http.get(this._Base_URL+'shippings/fetch', this.createAuthorizationHeader());
  }

  getShippingAddressDeatils(id: any) {
    return this.http.get(this._Base_URL+'shippings/details?id=' + id, this.createAuthorizationHeader());
  }

  updateShippingAddress(values: any) {
    return this.http.post(this._Base_URL+'shippings/update', values , this.createAuthorizationHeader());
  }

  deleteShippingAddress(values: any) {
    return this.http.post(this._Base_URL+'shippings/delete', values , this.createAuthorizationHeader());
  }

  updateBillingAddress(values: any) {
    return this.http.post(this._Base_URL+'orders/update-billing', values , this.createAuthorizationHeader());
  }

  vendorCount() {
    return this.http.get(this._Base_URL+'brands/count', this.createAuthorizationHeader());
  }
  
  vendorInfoUpdate(updatedData:any) {
    return this.http.put(this._Base_URL+'brands/update/info' , updatedData, this.createAuthorizationHeader());
  }

  checkEmail(values: any) {
    return this.http.post(this._Base_URL+'user/check-email', values);
  }

  manuCategories() {
    return this.http.get(this._Base_URL + 'category/categories', this.createAuthorizationHeader());
  }

  featuredCategories() {
    return this.http.get(this._Base_URL + 'category/featured-categories', this.createAuthorizationHeader());
  }

  fetchProductsByCategory(values: any ) {
    return this.http.post(this._Base_URL+'shop/category-products', values, this.createAuthorizationHeader());
  }

  logout() {
    localStorage.removeItem('local_data');
    localStorage.removeItem('authorization_data');
    this.storage.delete('user_session').subscribe({
      next: (user) => {
      },
      error: (error) => {
        /* Called if data is invalid */
        console.log(error);
      },          
    });
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
