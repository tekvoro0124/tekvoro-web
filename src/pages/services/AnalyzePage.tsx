import { motion } from 'framer-motion';
import PageHeader from '../../components/layout/PageHeader';
import { BarChart, TrendingUp, Target, Brain, PieChart, Activity } from 'lucide-react';

const AnalyzePage = () => {
  const services = [
    {
      icon: BarChart,
      title: 'Data Analytics',
      description: 'Transform raw data into actionable insights that drive business decisions.',
      features: ['Business Intelligence', 'Data Visualization', 'Statistical Analysis', 'Reporting Dashboards']
    },
    {
      icon: TrendingUp,
      title: 'Performance Optimization',
      description: 'Identify bottlenecks and optimize systems for maximum efficiency and speed.',
      features: ['Performance Monitoring', 'Code Optimization', 'Database Tuning', 'Resource Management']
    },
    {
      icon: Brain,
      title: 'Predictive Analytics',
      description: 'Use machine learning to forecast trends and predict future outcomes.',
      features: ['Forecasting Models', 'Risk Assessment', 'Customer Behavior Analysis', 'Market Predictions']
    },
    {
      icon: Target,
      title: 'Business Intelligence',
      description: 'Comprehensive BI solutions to support strategic decision-making.',
      features: ['KPI Tracking', 'Executive Dashboards', 'Competitive Analysis', 'Market Research']
    }
  ];

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Analyze & Optimize"
        description="Leverage data analytics and optimization techniques to maximize performance and drive informed decisions."
        bgImage="https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      />

      <section className="section">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold text-secondary-900 dark:text-white mb-6">
              Data-Driven Optimization
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              Our analytics and optimization services help businesses make informed decisions, improve performance, and achieve better outcomes through data-driven insights.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card p-8"
              >
                <div className="bg-primary-100 dark:bg-primary-900/30 p-4 rounded-full w-fit mb-6">
                  <service.icon className="h-8 w-8 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-xl font-bold text-secondary-900 dark:text-white mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-primary-600 mr-2">•</span>
                      <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AnalyzePage;