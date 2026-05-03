// supabase-client.js
// Initialize Supabase client
// Replace these with your actual Supabase URL and anon key
const SUPABASE_URL = 'https://mveuuogpcdjgmivwcngz.supabase.co'; 
const SUPABASE_ANON_KEY = 'sb_publishable_Poec_RCJqZswJUxdMmL19Q_YXfoQsh2'; 

// Make sure Supabase is loaded
if (typeof supabase === 'undefined') {
    console.error('Supabase library not loaded! Make sure to include: <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>');
}

// Initialize the Supabase client
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Function to submit feedback
async function submitFeedback(userName, comment, rating) {
    try {
        // Validate inputs
        if (!comment || comment.trim() === '') {
            throw new Error('Please enter your feedback');
        }
        
        if (!rating || rating < 1 || rating > 5) {
            throw new Error('Please select a rating');
        }

        // Prepare the data
        const feedbackData = {
            user_name: userName || null,
            comment: comment.trim(),
            rating: rating
        };

        console.log('Submitting feedback:', feedbackData); // Debug log

        // Insert into Supabase
        const { data, error } = await supabaseClient
            .from('feedback')
            .insert([feedbackData])
            .select();

        if (error) {
            console.error('Supabase error:', error);
            throw new Error(error.message);
        }

        console.log('Success! Data saved:', data); // Debug log
        return { success: true, data: data };
    } catch (error) {
        console.error('Error submitting feedback:', error);
        return { success: false, error: error.message };
    }
}

// Function to fetch all feedback (for admin purposes)
async function getFeedback(limit = 50) {
    try {
        const { data, error } = await supabaseClient
            .from('feedback')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(limit);

        if (error) {
            throw new Error(error.message);
        }

        return { success: true, data: data };
    } catch (error) {
        console.error('Error fetching feedback:', error);
        return { success: false, error: error.message };
    }
}

// Function to get average rating
async function getAverageRating() {
    try {
        const { data, error } = await supabaseClient
            .from('feedback')
            .select('rating');

        if (error) {
            throw new Error(error.message);
        }

        if (data.length === 0) {
            return { success: true, average: 0, count: 0 };
        }

        const total = data.reduce((sum, item) => sum + item.rating, 0);
        const average = total / data.length;

        return { success: true, average: average, count: data.length };
    } catch (error) {
        console.error('Error calculating average rating:', error);
        return { success: false, error: error.message };
    }
}
