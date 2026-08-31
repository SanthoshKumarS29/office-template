export const validate=(data,rules)=>{const errors={};const formatFieldName=(field)=>field.charAt(0).toUpperCase()+field.slice(1);for(let field in rules){const validation=rules[field];if(field==="resume"){const file=data.resume;if(validation.required&&(!file||file.size===0)){errors.resume="Resume is required";continue}
if(validation.fileTypes){const ext=file.name.split(".").pop().toLowerCase();if(!validation.fileTypes.includes(ext)){errors.resume=`Invalid file type (${ext}). Allowed: ${validation.fileTypes.join(", ")}`}}
if(validation.maxSize&&file.size>validation.maxSize){errors.resume=`File too large. Max size: ${validation.maxSize / (1024 * 1024)}MB`}
continue}
let value=data[field]?.toString().trim();if(validation.required&&(!value||value==="")){errors[field]=`*${formatFieldName(field)} is required`;continue}
if(/[<>]/.test(value)){errors[field]="Invalid characters detected";continue}
if(validation.min&&value.length<validation.min){errors[field]=`${field} must be at least ${validation.min} characters`}
if(validation.max&&value.length>validation.max){errors[field]=`${field} cannot exceed ${validation.max} characters`}
if(validation.numeric&&isNaN(value)){errors[field]=`${field} must be a number`}
if(validation.regex&&!validation.regex.test(value)){errors[field]=`${field} format is invalid`}
if(validation.email){const emailRegex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;if(!emailRegex.test(value)){errors[field]="Invalid email format"}}}
return errors};export const contactRules={name:{required:!0,min:2,max:50,regex:/^[A-Za-z\s]+$/},email:{required:!0,email:!0,max:100},phone:{required:!0,numeric:!0,min:8,max:15},message:{required:!0,min:2,max:50,regex:/^[A-Za-z\s]+$/},}
export const careerRules={name:{required:!0,min:2,max:50,regex:/^[A-Za-z\s]+$/},email:{required:!0,email:!0,max:100},jobRole:{required:!0,max:100},experience:{required:!0,regex:/^[0-9]+(-[0-9]+)?\s?(years|year)?$/i},phone:{required:!0,numeric:!0,min:8,max:15},countryCode:{required:!0,numeric:!0,max:4},resume:{required:!0,fileTypes:["pdf","doc","docx"],maxSize:2*1024*1024}}
export const quickLeadRules={phoneNumber:{required:!0,pattern:/^\+?[0-9]+$/,message:"Phone number is required",},purpose:{required:!0,message:"Please select purpose",},}