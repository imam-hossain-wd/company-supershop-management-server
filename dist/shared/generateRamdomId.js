"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IDGenerator = exports.generateIdByType = exports.generateRandomId = exports.generateSequentialId = exports.generateWebinerId = exports.generateInstructorId = exports.generateVolunteerId = exports.generateMemberId = exports.generateUserId = void 0;
// Generate unique user ID: u-1001 format
const generateUserId = () => __awaiter(void 0, void 0, void 0, function* () {
    let isUnique = false;
    let userId = '';
    // You'll need to import your User model and check for uniqueness
    // const User = require('../modules/user/user.model').default;
    while (!isUnique) {
        const randomNum = Math.floor(1000 + Math.random() * 9000);
        userId = `u-${randomNum}`;
        // Check if ID already exists in database
        // const existingUser = await User.findOne({ user_id: userId });
        // if (!existingUser) {
        //   isUnique = true;
        // }
        // For now, assuming it's unique (you should implement DB check)
        isUnique = true;
    }
    return userId;
});
exports.generateUserId = generateUserId;
// Generate unique member ID: m-1001 format
const generateMemberId = () => __awaiter(void 0, void 0, void 0, function* () {
    let isUnique = false;
    let memberId = '';
    // You'll need to import your Member model and check for uniqueness
    // const Member = require('../modules/member/member.model').default;
    while (!isUnique) {
        const randomNum = Math.floor(1000 + Math.random() * 9000);
        memberId = `m-${randomNum}`;
        // Check if ID already exists in database
        // const existingMember = await Member.findOne({ member_id: memberId });
        // if (!existingMember) {
        //   isUnique = true;
        // }
        // For now, assuming it's unique (you should implement DB check)
        isUnique = true;
    }
    return memberId;
});
exports.generateMemberId = generateMemberId;
// Generate unique volunteer ID: v-1001 format
const generateVolunteerId = () => __awaiter(void 0, void 0, void 0, function* () {
    let isUnique = false;
    let volunteerId = '';
    // Import your Volunteer model
    // const Volunteer = require('../modules/volunteer/volunteer.model').default;
    while (!isUnique) {
        const randomNum = Math.floor(1000 + Math.random() * 9000);
        volunteerId = `v-${randomNum}`;
        // Check if ID already exists in database
        // const existingVolunteer = await Volunteer.findOne({ volunteer_id: volunteerId });
        // if (!existingVolunteer) {
        //   isUnique = true;
        // }
        isUnique = true;
    }
    return volunteerId;
});
exports.generateVolunteerId = generateVolunteerId;
// Generate unique instructor ID: i-1001 format
const generateInstructorId = () => __awaiter(void 0, void 0, void 0, function* () {
    let isUnique = false;
    let instructorId = '';
    // Import your Instructor model
    // const Instructor = require('../modules/instructor/instructor.model').default;
    while (!isUnique) {
        const randomNum = Math.floor(1000 + Math.random() * 9000);
        instructorId = `i-${randomNum}`;
        // Check if ID already exists in database
        // const existingInstructor = await Instructor.findOne({ instructor_id: instructorId });
        // if (!existingInstructor) {
        //   isUnique = true;
        // }
        isUnique = true;
    }
    return instructorId;
});
exports.generateInstructorId = generateInstructorId;
// Generate unique webiner ID: w-1001 format
const generateWebinerId = () => __awaiter(void 0, void 0, void 0, function* () {
    let isUnique = false;
    let webinerId = '';
    // Import your Webiner model
    // const Webiner = require('../modules/webiner/webiner.model').default;
    while (!isUnique) {
        const randomNum = Math.floor(1000 + Math.random() * 9000);
        webinerId = `w-${randomNum}`;
        // Check if ID already exists in database
        // const existingWebiner = await Webiner.findOne({ webiner_id: webinerId });
        // if (!existingWebiner) {
        //   isUnique = true;
        // }
        isUnique = true;
    }
    return webinerId;
});
exports.generateWebinerId = generateWebinerId;
// Alternative: Sequential ID generator with prefix
const generateSequentialId = (prefix_1, model_1, ...args_1) => __awaiter(void 0, [prefix_1, model_1, ...args_1], void 0, function* (prefix, model, idField = 'user_id') {
    try {
        // Find the latest document with the same prefix
        const latestDoc = yield model.findOne({
            [idField]: { $regex: `^${prefix}-` }
        }).sort({ [idField]: -1 });
        let nextNumber = 1001; // Starting number
        if (latestDoc && latestDoc[idField]) {
            const lastId = latestDoc[idField];
            const lastNumber = parseInt(lastId.split('-')[1]);
            nextNumber = lastNumber + 1;
        }
        return `${prefix}-${nextNumber}`;
    }
    catch (error) {
        // Fallback to random if sequential fails
        const randomNum = Math.floor(1000 + Math.random() * 9000);
        return `${prefix}-${randomNum}`;
    }
});
exports.generateSequentialId = generateSequentialId;
// Quick generation without DB check (for testing)
const generateRandomId = (prefix) => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    return `${prefix}-${randomNum}`;
};
exports.generateRandomId = generateRandomId;
// Single function to generate IDs based on type
const generateIdByType = (type) => __awaiter(void 0, void 0, void 0, function* () {
    const prefixMap = {
        user: 'u',
        member: 'm',
        volunteer: 'v',
        instructor: 'i',
        webiner: 'w'
    };
    return (0, exports.generateRandomId)(prefixMap[type]);
});
exports.generateIdByType = generateIdByType;
// Export all generators
exports.IDGenerator = {
    generateUserId: exports.generateUserId,
    generateMemberId: exports.generateMemberId,
    generateVolunteerId: exports.generateVolunteerId,
    generateInstructorId: exports.generateInstructorId,
    generateWebinerId: exports.generateWebinerId,
    generateSequentialId: exports.generateSequentialId,
    generateRandomId: exports.generateRandomId,
    generateIdByType: exports.generateIdByType
};
