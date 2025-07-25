/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { createFileRoute } from '@tanstack/react-router'

import { Route as rootRouteImport } from './routes/__root'
import { Route as AuthenticatedRouteImport } from './routes/_authenticated'
import { Route as IndexRouteImport } from './routes/index'

const SignupLazyRouteImport = createFileRoute('/signup')()
const LoginLazyRouteImport = createFileRoute('/login')()
const AuthenticatedProfileLazyRouteImport = createFileRoute(
  '/_authenticated/profile',
)()
const AuthenticatedPagesLazyRouteImport = createFileRoute(
  '/_authenticated/pages',
)()
const AuthenticatedMermaidLazyRouteImport = createFileRoute(
  '/_authenticated/mermaid',
)()
const AuthenticatedPageIdLazyRouteImport = createFileRoute(
  '/_authenticated/page/$id',
)()

const SignupLazyRoute = SignupLazyRouteImport.update({
  id: '/signup',
  path: '/signup',
  getParentRoute: () => rootRouteImport,
} as any).lazy(() => import('./routes/signup.lazy').then((d) => d.Route))
const LoginLazyRoute = LoginLazyRouteImport.update({
  id: '/login',
  path: '/login',
  getParentRoute: () => rootRouteImport,
} as any).lazy(() => import('./routes/login.lazy').then((d) => d.Route))
const AuthenticatedRoute = AuthenticatedRouteImport.update({
  id: '/_authenticated',
  getParentRoute: () => rootRouteImport,
} as any)
const IndexRoute = IndexRouteImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRouteImport,
} as any)
const AuthenticatedProfileLazyRoute =
  AuthenticatedProfileLazyRouteImport.update({
    id: '/profile',
    path: '/profile',
    getParentRoute: () => AuthenticatedRoute,
  } as any).lazy(() =>
    import('./routes/_authenticated/profile.lazy').then((d) => d.Route),
  )
const AuthenticatedPagesLazyRoute = AuthenticatedPagesLazyRouteImport.update({
  id: '/pages',
  path: '/pages',
  getParentRoute: () => AuthenticatedRoute,
} as any).lazy(() =>
  import('./routes/_authenticated/pages.lazy').then((d) => d.Route),
)
const AuthenticatedMermaidLazyRoute =
  AuthenticatedMermaidLazyRouteImport.update({
    id: '/mermaid',
    path: '/mermaid',
    getParentRoute: () => AuthenticatedRoute,
  } as any).lazy(() =>
    import('./routes/_authenticated/mermaid.lazy').then((d) => d.Route),
  )
const AuthenticatedPageIdLazyRoute = AuthenticatedPageIdLazyRouteImport.update({
  id: '/page/$id',
  path: '/page/$id',
  getParentRoute: () => AuthenticatedRoute,
} as any).lazy(() =>
  import('./routes/_authenticated/page.$id.lazy').then((d) => d.Route),
)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/login': typeof LoginLazyRoute
  '/signup': typeof SignupLazyRoute
  '/mermaid': typeof AuthenticatedMermaidLazyRoute
  '/pages': typeof AuthenticatedPagesLazyRoute
  '/profile': typeof AuthenticatedProfileLazyRoute
  '/page/$id': typeof AuthenticatedPageIdLazyRoute
}
export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/login': typeof LoginLazyRoute
  '/signup': typeof SignupLazyRoute
  '/mermaid': typeof AuthenticatedMermaidLazyRoute
  '/pages': typeof AuthenticatedPagesLazyRoute
  '/profile': typeof AuthenticatedProfileLazyRoute
  '/page/$id': typeof AuthenticatedPageIdLazyRoute
}
export interface FileRoutesById {
  __root__: typeof rootRouteImport
  '/': typeof IndexRoute
  '/_authenticated': typeof AuthenticatedRouteWithChildren
  '/login': typeof LoginLazyRoute
  '/signup': typeof SignupLazyRoute
  '/_authenticated/mermaid': typeof AuthenticatedMermaidLazyRoute
  '/_authenticated/pages': typeof AuthenticatedPagesLazyRoute
  '/_authenticated/profile': typeof AuthenticatedProfileLazyRoute
  '/_authenticated/page/$id': typeof AuthenticatedPageIdLazyRoute
}
export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/login'
    | '/signup'
    | '/mermaid'
    | '/pages'
    | '/profile'
    | '/page/$id'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/login'
    | '/signup'
    | '/mermaid'
    | '/pages'
    | '/profile'
    | '/page/$id'
  id:
    | '__root__'
    | '/'
    | '/_authenticated'
    | '/login'
    | '/signup'
    | '/_authenticated/mermaid'
    | '/_authenticated/pages'
    | '/_authenticated/profile'
    | '/_authenticated/page/$id'
  fileRoutesById: FileRoutesById
}
export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  AuthenticatedRoute: typeof AuthenticatedRouteWithChildren
  LoginLazyRoute: typeof LoginLazyRoute
  SignupLazyRoute: typeof SignupLazyRoute
}

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/signup': {
      id: '/signup'
      path: '/signup'
      fullPath: '/signup'
      preLoaderRoute: typeof SignupLazyRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/login': {
      id: '/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof LoginLazyRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/_authenticated': {
      id: '/_authenticated'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthenticatedRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/_authenticated/profile': {
      id: '/_authenticated/profile'
      path: '/profile'
      fullPath: '/profile'
      preLoaderRoute: typeof AuthenticatedProfileLazyRouteImport
      parentRoute: typeof AuthenticatedRoute
    }
    '/_authenticated/pages': {
      id: '/_authenticated/pages'
      path: '/pages'
      fullPath: '/pages'
      preLoaderRoute: typeof AuthenticatedPagesLazyRouteImport
      parentRoute: typeof AuthenticatedRoute
    }
    '/_authenticated/mermaid': {
      id: '/_authenticated/mermaid'
      path: '/mermaid'
      fullPath: '/mermaid'
      preLoaderRoute: typeof AuthenticatedMermaidLazyRouteImport
      parentRoute: typeof AuthenticatedRoute
    }
    '/_authenticated/page/$id': {
      id: '/_authenticated/page/$id'
      path: '/page/$id'
      fullPath: '/page/$id'
      preLoaderRoute: typeof AuthenticatedPageIdLazyRouteImport
      parentRoute: typeof AuthenticatedRoute
    }
  }
}

interface AuthenticatedRouteChildren {
  AuthenticatedMermaidLazyRoute: typeof AuthenticatedMermaidLazyRoute
  AuthenticatedPagesLazyRoute: typeof AuthenticatedPagesLazyRoute
  AuthenticatedProfileLazyRoute: typeof AuthenticatedProfileLazyRoute
  AuthenticatedPageIdLazyRoute: typeof AuthenticatedPageIdLazyRoute
}

const AuthenticatedRouteChildren: AuthenticatedRouteChildren = {
  AuthenticatedMermaidLazyRoute: AuthenticatedMermaidLazyRoute,
  AuthenticatedPagesLazyRoute: AuthenticatedPagesLazyRoute,
  AuthenticatedProfileLazyRoute: AuthenticatedProfileLazyRoute,
  AuthenticatedPageIdLazyRoute: AuthenticatedPageIdLazyRoute,
}

const AuthenticatedRouteWithChildren = AuthenticatedRoute._addFileChildren(
  AuthenticatedRouteChildren,
)

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  AuthenticatedRoute: AuthenticatedRouteWithChildren,
  LoginLazyRoute: LoginLazyRoute,
  SignupLazyRoute: SignupLazyRoute,
}
export const routeTree = rootRouteImport
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()
