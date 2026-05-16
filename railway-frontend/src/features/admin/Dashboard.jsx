import { useEffect, useState, useMemo } from 'react';
import api from '../../api/axios';
import { FaTrain, FaTicketAlt, FaUserCog, FaMoneyCheckAlt } from 'react-icons/fa';
import { Bar } from 'react-chartjs-2';
import { motion } from 'framer-motion';

// ✅ Chart.js setup
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Dashboard() {
  const [stats, setStats] = useState({ trains: 0, bookings: 0, cancelled: 0, payments: 0 });
  const [bookingsByDay, setBookingsByDay] = useState({});

  useEffect(() => {
    // Fetch Trains
    api.get('/traininfo/trains/getall')
      .then(res => setStats(s => ({ ...s, trains: res.data.length })))
      .catch(console.error);

    // Fetch Reservations
    api.get('/reservation-service/reservations/all')
      .then(res => {
        setStats(s => ({
          ...s,
          bookings: res.data.length,
          cancelled: res.data.filter(b => b.status === 'CANCELLED').length
        }));

        const byDay = {};
        res.data.forEach(b => {
          const day = b.bookingDateTime?.slice(0, 10) || 'Unknown';
          byDay[day] = (byDay[day] || 0) + 1;
        });
        setBookingsByDay(byDay);
      })
      .catch(console.error);

    // Fetch Payments
    api.get('/payment-service/payments/status/all')
      .then(res => setStats(s => ({ ...s, payments: res.data.length })))
      .catch(console.error);

  }, []);

  // ✅ Memoized chart data to avoid re-instantiating chart
  const chartData = useMemo(() => ({
    labels: Object.keys(bookingsByDay),
    datasets: [
      {
        label: 'Bookings',
        data: Object.values(bookingsByDay),
        backgroundColor: '#1ABC9C',
        borderRadius: 6
      }
    ]
  }), [bookingsByDay]);

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: true, labels: { color: '#212529' } },
      title: { display: false }
    },
    scales: {
      x: { ticks: { color: '#212529' } },
      y: { ticks: { color: '#212529' } }
    }
  };

  const cardData = [
    { icon: <FaTrain size={32} className="mb-2 text-primary" />, label: 'Total Trains', value: stats.trains },
    { icon: <FaTicketAlt size={32} className="mb-2 text-success" />, label: 'Total Bookings', value: stats.bookings },
    { icon: <FaMoneyCheckAlt size={32} className="mb-2 text-warning" />, label: 'Payments', value: stats.payments },
    { icon: <FaUserCog size={32} className="mb-2 text-danger" />, label: 'Cancelled', value: stats.cancelled }
  ];

  return (
    <div className="container mt-5">
      {/* KPI Cards */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="row mb-4">
          {cardData.map((card, i) => (
            <motion.div
              key={card.label}
              className="col-md-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 + 0.3 }}
            >
              <div className="card text-center p-3">
                {card.icon}
                <h5>{card.label}</h5>
                <span className="fs-3 fw-bold">{card.value}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Bookings Over Time Chart */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <div className="card p-4 mb-4">
          <h4>Bookings Over Time</h4>
          {Object.keys(bookingsByDay).length
            ? <Bar data={chartData} options={chartOptions} />
            : <div className="skeleton" style={{ height: 200 }} />}
        </div>
      </motion.div>
    </div>
  );
}