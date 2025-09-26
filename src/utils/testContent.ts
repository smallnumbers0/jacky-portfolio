import { contentConfig } from '../content'
import { validateContent, validateContentWithWarnings } from './validateContent'

export function testContentManagementSystem() {
  try {
    console.log('🧪 Testing Content Management System...')

    // Test content import
    console.log('✅ Content imported successfully')
    console.log('Profile:', contentConfig.profile.name)
    console.log('Work Experience entries:', contentConfig.workExperience.length)
    console.log('Blog Posts:', contentConfig.blogPosts.length)
    console.log('Social Links:', contentConfig.socialLinks.length)
    console.log('Skills:', contentConfig.skills.length)

    // Test validation
    const { validatedContent, warnings } = validateContentWithWarnings(contentConfig)
    console.log('✅ Content validation passed')

    if (warnings.length > 0) {
      console.log('⚠️ Validation warnings:')
      warnings.forEach(warning => console.log('  -', warning))
    }

    // Test type checking
    const profileName: string = validatedContent.profile.name
    const firstJob = validatedContent.workExperience[0]
    const firstPost = validatedContent.blogPosts[0]

    console.log('✅ TypeScript type checking works')
    console.log('✅ All tests passed!')

    return {
      success: true,
      content: validatedContent,
      warnings
    }
  } catch (error) {
    console.error('❌ Content management system test failed:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}