// Generate unique user ID: u-1001 format
export const generateUserId = async (): Promise<string> => {
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
};

// Generate unique member ID: m-1001 format
export const generateMemberId = async (): Promise<string> => {
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
};

// Generate unique volunteer ID: v-1001 format
export const generateVolunteerId = async (): Promise<string> => {
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
};

// Generate unique instructor ID: i-1001 format
export const generateInstructorId = async (): Promise<string> => {
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
};

// Generate unique webiner ID: w-1001 format
export const generateWebinerId = async (): Promise<string> => {
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
};

// Alternative: Sequential ID generator with prefix
export const generateSequentialId = async (
  prefix: string,
  model: any,
  idField: string = 'user_id'
): Promise<string> => {
  try {
    // Find the latest document with the same prefix
    const latestDoc = await model.findOne({
      [idField]: { $regex: `^${prefix}-` }
    }).sort({ [idField]: -1 });
    
    let nextNumber = 1001; // Starting number
    
    if (latestDoc && latestDoc[idField]) {
      const lastId = latestDoc[idField];
      const lastNumber = parseInt(lastId.split('-')[1]);
      nextNumber = lastNumber + 1;
    }
    
    return `${prefix}-${nextNumber}`;
  } catch (error) {
    // Fallback to random if sequential fails
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    return `${prefix}-${randomNum}`;
  }
};

// Quick generation without DB check (for testing)
export const generateRandomId = (prefix: string): string => {
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  return `${prefix}-${randomNum}`;
};

// Single function to generate IDs based on type
export const generateIdByType = async (
  type: 'user' | 'member' | 'volunteer' | 'instructor' | 'webiner'
): Promise<string> => {
  const prefixMap = {
    user: 'u',
    member: 'm', 
    volunteer: 'v',
    instructor: 'i',
    webiner: 'w'
  };
  
  return generateRandomId(prefixMap[type]);
};

// Export all generators
export const IDGenerator = {
  generateUserId,
  generateMemberId,
  generateVolunteerId,
  generateInstructorId,
  generateWebinerId,
  generateSequentialId,
  generateRandomId,
  generateIdByType
};