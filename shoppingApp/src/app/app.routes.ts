import { Product } from './types/product';
import { Categories } from './components/manage/categories/categories';
import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { CategoryForm } from './components/manage/category-form/category-form';
import { BrandForm } from './components/manage/brand-form/brand-form';
import {Brands} from './components/manage/brands/brands';
import { Products } from './components/manage/products/products';
import { ProductForm } from './components/manage/product-form/product-form';
import { ProductList } from './components/product-list/product-list';
import { ProductDetail } from './components/product-detail/product-detail';
import { Register } from './components/register/register';
import { Login } from './components/login/login';
import { authGuard } from './core/auth-guard';
import { AdminDashboard } from './components/manage/admin-dashboard/admin-dashboard';
import { adminGuard } from './core/admin-guard';
import { CustomerProfile } from './components/customer-profile/customer-profile';
import { Wishlist } from './components/wishlist/wishlist';



export const routes: Routes = [
    {
        path: '',
        component:Home,
        canActivate: [authGuard]
    },
    {
        path:'admin',
        component:AdminDashboard,
        canActivate: [adminGuard]
    },
    {
        path: "admin/categories",
        component:Categories,
        canActivate: [adminGuard]
    },
    {
        path: "admin/categories/add",
        component:CategoryForm,
        canActivate: [adminGuard]
    },
    {
        path: "admin/categories/:id",
        component:CategoryForm,
        canActivate: [adminGuard]
    },
    {
        path: "admin/brands",
        component:Brands,
        canActivate: [adminGuard]
    },
    {
        path: "admin/brands/add",
        component:BrandForm,
        canActivate: [adminGuard]
    },
    {
        path: "admin/brands/:id",
        component:BrandForm,
        canActivate: [adminGuard]
    },
    {
        path: "admin/products",
        component:Products,
        canActivate: [adminGuard]
    },
    {
        path: "admin/products/add",
        component:ProductForm,
        canActivate: [adminGuard]
    },
    {
        path: "admin/products/:id",
        component:ProductForm,
        canActivate: [adminGuard]
    },
    {
        path:"products",
        component:ProductList,
        canActivate: [authGuard]
    },
    {
        path:"product/:id",
        component:ProductDetail,
        canActivate: [authGuard]
    },
    {
        path:"profile",
        component:CustomerProfile
    },
    {
        path : "register",
        component:Register , 
    },
    {
        path : "login",
        component:Login  
    },
    {   
        path: 'wishlist',
        component: Wishlist
    },
];
