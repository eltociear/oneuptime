// Fetch All Projects List
export const FETCH_PROJECTS_REQUEST: string = 'FETCH_PROJECTS_REQUEST';
export const FETCH_PROJECTS_SUCCESS: string = 'FETCH_PROJECTS_SUCCESS';
export const FETCH_PROJECTS_FAILURE: string = 'FETCH_PROJECTS_FAILURE';
export const FETCH_PROJECTS_RESET: string = 'FETCH_PROJECTS_RESET';

// Fetch A Project
export const FETCH_PROJECT_REQUEST: string = 'FETCH_PROJECT_REQUEST';
export const FETCH_PROJECT_SUCCESS: string = 'FETCH_PROJECT_SUCCESS';
export const FETCH_PROJECT_FAILURE: string = 'FETCH_PROJECT_FAILURE';
export const FETCH_PROJECT_RESET: string = 'FETCH_PROJECT_RESET';

// Fetch User Projects
export const FETCH_USER_PROJECTS_REQUEST: string =
    'FETCH_USER_PROJECTS_REQUEST';
export const FETCH_USER_PROJECTS_SUCCESS: string =
    'FETCH_USER_PROJECTS_SUCCESS';
export const FETCH_USER_PROJECTS_FAILURE: string =
    'FETCH_USER_PROJECTS_FAILURE';
export const FETCH_USER_PROJECTS_RESET: string = 'FETCH_USER_PROJECTS_RESET';

// Delete Project
export const DELETE_PROJECT_REQUEST: string = 'DELETE_PROJECT_REQUEST';
export const DELETE_PROJECT_RESET: string = 'DELETE_PROJECT_RESET';
export const DELETE_PROJECT_SUCCESS: string = 'DELETE_PROJECT_SUCCESS';
export const DELETE_PROJECT_FAILED: string = 'DELETE_PROJECT_FAILED';

// Block Project
export const BLOCK_PROJECT_REQUEST: string = 'BLOCK_PROJECT_REQUEST';
export const BLOCK_PROJECT_RESET: string = 'BLOCK_PROJECT_RESET';
export const BLOCK_PROJECT_SUCCESS: string = 'BLOCK_PROJECT_SUCCESS';
export const BLOCK_PROJECT_FAILED: string = 'BLOCK_PROJECT_FAILED';

// Restore Alert Limit
export const ALERT_LIMIT_REQUEST: string = 'ALERT_LIMIT_REQUEST';
export const ALERT_LIMIT_RESET: string = 'ALERT_LIMIT_RESET';
export const ALERT_LIMIT_SUCCESS: string = 'ALERT_LIMIT_SUCCESS';
export const ALERT_LIMIT_FAILED: string = 'ALERT_LIMIT_FAILED';

// Restore Project
export const RESTORE_PROJECT_REQUEST: string = 'RESTORE_PROJECT_REQUEST';
export const RESTORE_PROJECT_RESET: string = 'RESTORE_PROJECT_RESET';
export const RESTORE_PROJECT_SUCCESS: string = 'RESTORE_PROJECT_SUCCESS';
export const RESTORE_PROJECT_FAILED: string = 'RESTORE_PROJECT_FAILED';

// Unblock Project
export const UNBLOCK_PROJECT_REQUEST: string = 'UNBLOCK_PROJECT_REQUEST';
export const UNBLOCK_PROJECT_RESET: string = 'UNBLOCK_PROJECT_RESET';
export const UNBLOCK_PROJECT_SUCCESS: string = 'UNBLOCK_PROJECT_SUCCESS';
export const UNBLOCK_PROJECT_FAILED: string = 'UNBLOCK_PROJECT_FAILED';

// Admin Project Note
export const ADD_PROJECT_NOTE_REQUEST: string = 'ADD_PROJECT_NOTE_REQUEST';
export const ADD_PROJECT_NOTE_RESET: string = 'ADD_PROJECT_NOTE_RESET';
export const ADD_PROJECT_NOTE_SUCCESS: string = 'ADD_PROJECT_NOTE_SUCCESS';
export const ADD_PROJECT_NOTE_FAILURE: string = 'ADD_PROJECT_NOTE_FAILURE';

// Search Users
export const SEARCH_PROJECTS_REQUEST: string = 'SEARCH_PROJECTS_REQUEST';
export const SEARCH_PROJECTS_RESET: string = 'SEARCH_PROJECTS_RESET';
export const SEARCH_PROJECTS_SUCCESS: string = 'SEARCH_PROJECTS_SUCCESS';
export const SEARCH_PROJECTS_FAILURE: string = 'SEARCH_PROJECTS_FAILURE';

// Upgrade Project
export const CHANGE_PLAN_REQUEST: string = 'CHANGE_PLAN_REQUEST';
export const CHANGE_PLAN_SUCCESS: string = 'CHANGE_PLAN_SUCCESS';
export const CHANGE_PLAN_FAILURE: string = 'CHANGE_PLAN_FAILURE';

// fetch project team
export const FETCH_PROJECT_TEAM_REQUEST: string = 'FETCH_PROJECT_TEAM_REQUEST';
export const FETCH_PROJECT_TEAM_SUCCESS: string = 'FETCH_PROJECT_TEAM_SUCCESS';
export const FETCH_PROJECT_TEAM_ERROR: string = 'FETCH_PROJECT_TEAM_ERROR';

// add user to project
export const USER_CREATE_REQUEST: string = 'USER_CREATE_REQUEST';
export const USER_CREATE_SUCCESS: string = 'USER_CREATE_SUCCESS';
export const USER_CREATE_FAILURE: string = 'USER_CREATE_FAILURE';

//update user role
export const USER_UPDATE_ROLE_REQUEST: string = 'USER_UPDATE_ROLE_REQUEST';
export const USER_UPDATE_ROLE_SUCCESS: string = 'USER_UPDATE_ROLE_SUCCESS';
export const USER_UPDATE_ROLE_FAILURE: string = 'USER_UPDATE_ROLE_FAILURE';
export const CHANGE_USER_PROJECT_ROLES: string = 'CHANGE_USER_PROJECT_ROLES';

//delete user from project
export const TEAM_DELETE_SUCCESS: string = 'TEAM_DELETE_SUCCESS';
export const TEAM_DELETE_FAILURE: string = 'TEAM_DELETE_FAILURE';
export const TEAM_DELETE_RESET: string = 'TEAM_DELETE_RESET';
export const TEAM_DELETE_REQUEST: string = 'TEAM_DELETE_REQUEST';

//project balance
export const PROJECT_BALANCE_UPDATE_REQUEST: string =
    'PROJECT_BALANCE_UPDATE_REQUEST';
export const PROJECT_BALANCE_UPDATE_SUCCESS: string =
    'PROJECT_BALANCE_UPDATE_SUCCESS';
export const PROJECT_BALANCE_UPDATE_FAILURE: string =
    'PROJECT_BALANCE_UPDATE_FAILURE';

//users pagination
export const PAGINATE_USERS_NEXT: string = 'PAGINATE_USERS_NEXT';
export const PAGINATE_USERS_PREV: string = 'PAGINATE_USERS_PREV';

//project domain settings
export const PROJECT_DOMAIN_REQUEST: string = 'PROJECT_DOMAIN_REQUEST';
export const PROJECT_DOMAIN_SUCCESS: string = 'PROJECT_DOMAIN_SUCCESS';
export const PROJECT_DOMAIN_FAILURE: string = 'PROJECT_DOMAIN_FAILURE';

//delete project domain
export const DELETE_PROJECT_DOMAIN_REQUEST: string =
    'DELETE_PROJECT_DOMAIN_REQUEST';
export const DELETE_PROJECT_DOMAIN_SUCCESS: string =
    'DELETE_PROJECT_DOMAIN_SUCCESS';
export const DELETE_PROJECT_DOMAIN_FAILURE: string =
    'DELETE_PROJECT_DOMAIN_FAILURE';
export const RESET_DELETE_PROJECT_DOMAIN: string =
    'RESET_DELETE_PROJECT_DOMAIN';

//verify project domain
export const VERIFY_PROJECT_DOMAIN_REQUEST: string =
    'VERIFY_PROJECT_DOMAIN_REQUEST';
export const VERIFY_PROJECT_DOMAIN_SUCCESS: string =
    'VERIFY_PROJECT_DOMAIN_SUCCESS';
export const VERIFY_PROJECT_DOMAIN_FAILURE: string =
    'VERIFY_PROJECT_DOMAIN_FAILURE';
export const RESET_VERIFY_PROJECT_DOMAIN: string =
    'RESET_VERIFY_PROJECT_DOMAIN';

//unverify project domain
export const UNVERIFY_PROJECT_DOMAIN_REQUEST =
    'UNVERIFY_PROJECT_DOMAIN_REQUEST';
export const UNVERIFY_PROJECT_DOMAIN_SUCCESS =
    'UNVERIFY_PROJECT_DOMAIN_SUCCESS';
export const UNVERIFY_PROJECT_DOMAIN_FAILURE =
    'UNVERIFY_PROJECT_DOMAIN_FAILURE';
export const RESET_UNVERIFY_PROJECT_DOMAIN: string =
    'RESET_UNVERIFY_PROJECT_DOMAIN';

//reset project domain
export const RESET_PROJECT_DOMAIN_REQUEST: string =
    'RESET_PROJECT_DOMAIN_REQUEST';
export const RESET_PROJECT_DOMAIN_SUCCESS: string =
    'RESET_PROJECT_DOMAIN_SUCCESS';
export const RESET_PROJECT_DOMAIN_FAILURE: string =
    'RESET_PROJECT_DOMAIN_FAILURE';
export const RESET_PROJECT_DOMAIN_ON_MOUNT: string =
    'RESET_PROJECT_DOMAIN_ON_MOUNT';
