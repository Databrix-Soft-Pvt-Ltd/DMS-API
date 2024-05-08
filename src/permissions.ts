import { allow, rule, shield, and, or } from 'graphql-shield';

const isAuthenticated = rule()((parent, args, { user }) => user && user.userId !== undefined);
const isAdminUser = rule()(
  (parent, args, { user }) =>
    user && (user.userType === 'ADMIN' || user.userType === 'SUPER_ADMIN'),
);

const isOperationManager = rule()(
  (parent, args, { user }) => user && user.userType === 'OPERATIONS_MANAGER',
);

const isOperations = rule()((parent, args, { user }) => user && user.userType === 'OPERATIONS');

const isInstructorAdmin = rule()(
  (parent, args, { user }) => user && user.userType === 'INSTRUCTOR_ADMIN',
);

const isInstructor = rule()((parent, args, { user }) => user && user.userType === 'INSTRUCTOR');

const permissions = shield(
  {
    Query: {
      // getAllQuestionPapers: and(
      //   isAuthenticated,
      //   or(isAdminUser, isOperationManager, isOperations, isInstructor, isInstructorAdmin),
      // ),
      // getQuestionPaper: and(
      //   isAuthenticated,
      //   or(isAdminUser, isOperationManager, isOperations, isInstructor, isInstructorAdmin),
      // ),
      // getAllQuestion: and(
      //   isAuthenticated,
      //   or(isAdminUser, isOperationManager, isOperations, isInstructor, isInstructorAdmin),
      // ),
      // getQuestion: and(
      //   isAuthenticated,
      //   or(isAdminUser, isOperationManager, isOperations, isInstructor, isInstructorAdmin),
      // ),
      // getAllQuestionInstructions: and(
      //   isAuthenticated,
      //   or(isAdminUser, isOperationManager, isOperations, isInstructor, isInstructorAdmin),
      // ),
      // getQuestionInstructionById: and(
      //   isAuthenticated,
      //   or(isAdminUser, isOperationManager, isOperations, isInstructor, isInstructorAdmin),
      // ),
      // getAllQuestionTemplate: and(
      //   isAuthenticated,
      //   or(isAdminUser, isOperationManager, isOperations, isInstructor, isInstructorAdmin),
      // ),
      // getQuestionTemplateById: and(
      //   isAuthenticated,
      //   or(isAdminUser, isOperationManager, isOperations, isInstructor, isInstructorAdmin),
      // ),
      // getAllTags: and(
      //   isAuthenticated,
      //   or(isAdminUser, isOperationManager, isOperations, isInstructor, isInstructorAdmin),
      // ),
      // getTagsById: and(
      //   isAuthenticated,
      //   or(isAdminUser, isOperationManager, isOperations, isInstructor, isInstructorAdmin),
      // ),
    },
    Mutation: {
      // createQuestion: and(isAuthenticated, or(isAdminUser, isOperationManager, isOperations)),
      // editQuestion: and(isAuthenticated, or(isAdminUser, isOperationManager, isOperations)),
      // deleteQuestion: and(isAuthenticated, or(isAdminUser, isOperationManager, isOperations)),
      // createQuestionPaper: and(isAuthenticated, or(isAdminUser, isOperationManager, isOperations)),
      // editQuestionPaper: and(isAuthenticated, or(isAdminUser, isOperationManager, isOperations)),
      // deleteQuestionPaper: and(isAuthenticated, or(isAdminUser, isOperationManager, isOperations)),
      // createQuestionInstruction: and(
      //   isAuthenticated,
      //   or(isAdminUser, isOperationManager, isOperations),
      // ),
      // editQuestionInstruction: and(
      //   isAuthenticated,
      //   or(isAdminUser, isOperationManager, isOperations),
      // ),
      // deleteQuestionInstruction: and(
      //   isAuthenticated,
      //   or(isAdminUser, isOperationManager, isOperations),
      // ),
      // createQuestionTemplate: and(
      //   isAuthenticated,
      //   or(isAdminUser, isOperationManager, isOperations),
      // ),
      // editQuestionTemplate: and(isAuthenticated, or(isAdminUser, isOperationManager, isOperations)),
      // deleteQuestionTemplate: and(
      //   isAuthenticated,
      //   or(isAdminUser, isOperationManager, isOperations),
      // ),
      // uploadQuestion: and(isAuthenticated, or(isAdminUser, isOperationManager, isOperations)),
      // createTags: and(isAuthenticated, or(isAdminUser, isOperationManager, isOperations)),
      // editTags: and(isAuthenticated, or(isAdminUser, isOperationManager, isOperations)),
      // deleteTags: and(isAuthenticated, or(isAdminUser, isOperationManager, isOperations)),
    },
  },
  {
    debug: true,
    fallbackRule: allow,
    allowExternalErrors: true,
  },
);

export default permissions;
