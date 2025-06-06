import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ApperIcon from '../components/ApperIcon'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          className="mb-8"
        >
          <ApperIcon name="Music" size={80} className="mx-auto text-primary" />
        </motion.div>
        
        <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          404
        </h1>
        
        <h2 className="text-2xl font-semibold mb-4">Track Not Found</h2>
        
        <p className="text-surface-400 mb-8 max-w-md">
          Looks like this beat dropped off the playlist. Let's get you back to the music.
        </p>
        
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-primary hover:bg-primary-light text-black font-semibold px-6 py-3 rounded-full transition-colors"
        >
          <ApperIcon name="Home" size={20} />
          Back to Home
        </Link>
      </motion.div>
    </div>
  )
}