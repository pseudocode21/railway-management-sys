import { useEffect, useState, useRef } from 'react';
import api from '../../api/axios';
import { getUserFromToken } from '../../utils/jwt';
import {
  Card,
  Row,
  Col,
  Badge,
  Button,
  Image,
  Spinner,
  Alert,
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap';
import { FiCamera, FiMail, FiPhone, FiShield } from 'react-icons/fi';

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('jwt');
        const user = getUserFromToken(token);
        if (!user) {
          setError('Not signed in.');
          setLoading(false);
          return;
        }
        try {
          const res = await api.get(`/user-service/users/${user.userId || user.id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setProfile(res.data);
        } catch {
          // Fallback to token info if API fetch fails
          setProfile(user);
        }
      } catch (e) {
        setError('Failed to load profile.');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const getInitials = (name) => {
    if (!name) return '?';
    const parts = name.trim().split(/\s+/);
    return parts.slice(0, 2).map(p => p[0]).join('').toUpperCase();
  };

  const colorFromName = (name) => {
    const palette = ['#2563EB', '#10B981', '#8B5CF6', '#F59E0B', '#EF4444', '#14B8A6'];
    if (!name) return palette[0];
    let sum = 0;
    for (let i = 0; i < name.length; i++) sum = (sum + name.charCodeAt(i)) % 997;
    return palette[sum % palette.length];
  };

  const handleChooseFile = () => fileInputRef.current?.click();

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setError('');

    // Validate type and size (<= 3 MB)
    const validTypes = ['image/png', 'image/jpeg', 'image/jpg'];
    if (!validTypes.includes(file.type)) {
      setError('Please select a PNG or JPG image.');
      return;
    }
    const maxBytes = 3 * 1024 * 1024;
    if (file.size > maxBytes) {
      setError('Image is too large. Max size is 3MB.');
      return;
    }

    try {
      setUploading(true);
      const token = localStorage.getItem('jwt');
      const form = new FormData();
      form.append('file', file); // backend should expect "file"

      // Adjust this endpoint to match your backend
      const userId = profile.userId || profile.id;
      const res = await api.post(
        `/user-service/users/${userId}/avatar`,
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      // Expect the API to return the new avatar URL in res.data.avatarUrl
      const newUrl = res?.data?.avatarUrl;
      setProfile((prev) => ({ ...prev, avatarUrl: newUrl || prev?.avatarUrl }));
    } catch (err) {
      setError('Failed to upload image. Please try again.');
    } finally {
      setUploading(false);
      // Reset the input so the same file can be chosen again if needed
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <Spinner animation="border" role="status" />
        <p className="mt-3 text-muted">Loading profile...</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="container mt-5">
        <Alert variant="warning" className="mb-0">No profile data available.</Alert>
      </div>
    );
  }

  const name = profile.fullName || profile.username || 'User';
  const role = (profile.role || 'USER').toUpperCase();
  const roleVariant = role === 'ADMIN' ? 'danger' : 'success';
  const avatarUrl = profile.avatarUrl;

  return (
    <div className="container mt-5">
      {error && (
        <Alert variant="danger" className="mb-3">
          {error}
        </Alert>
      )}

      <Card className="shadow-sm p-4">
        <Row className="align-items-center g-3">
          {/* Avatar area */}
          <Col xs={12} md="auto" className="text-center">
            <div className="position-relative d-inline-block">
              {avatarUrl ? (
                <Image
                  src={avatarUrl}
                  alt={`Profile photo of ${name}`}
                  roundedCircle
                  width={112}
                  height={112}
                  style={{ objectFit: 'cover', border: role === 'ADMIN' ? '2px solid #dc3545' : '2px solid #198754' }}
                />
              ) : (
                <div
                  className="rounded-circle d-flex align-items-center justify-content-center text-white"
                  style={{
                    width: 112,
                    height: 112,
                    fontSize: 28,
                    fontWeight: 600,
                    background: colorFromName(name),
                    border: role === 'ADMIN' ? '2px solid #dc3545' : '2px solid #198754',
                  }}
                  aria-label={`Profile placeholder for ${name}`}
                >
                  {getInitials(name)}
                </div>
              )}

              <OverlayTrigger placement="bottom" overlay={<Tooltip>Change profile photo</Tooltip>}>
                <Button
                  variant="light"
                  size="sm"
                  className="position-absolute end-0 bottom-0 rounded-circle border"
                  style={{ transform: 'translate(20%, 20%)', width: 36, height: 36, padding: 0 }}
                  onClick={handleChooseFile}
                  disabled={uploading}
                  aria-label="Change profile photo"
                >
                  {uploading ? (
                    <Spinner animation="border" size="sm" />
                  ) : (
                    <FiCamera />
                  )}
                </Button>
              </OverlayTrigger>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg"
                className="d-none"
                onChange={handleFileChange}
              />
            </div>
          </Col>

          {/* Name and meta */}
          <Col xs={12} md className="text-md-start text-center">
            <h3 className="mb-1 text-truncate" title={name} style={{ maxWidth: 420 }}>
              {name}{' '}
              <Badge bg={roleVariant} className="align-middle">
                {role}
              </Badge>
            </h3>
            <div className="text-muted small">
              {profile.email && (
                <span className="me-3 d-inline-flex align-items-center">
                  <FiMail className="me-1" /> {profile.email}
                </span>
              )}
              {profile.phone && (
                <span className="d-inline-flex align-items-center">
                  <FiPhone className="me-1" /> {profile.phone}
                </span>
              )}
            </div>
            <div className="text-muted mt-1 small">
              {profile.joinedAt && <span className="me-3">Joined: {new Date(profile.joinedAt).toLocaleDateString()}</span>}
              {profile.lastLoginAt && <span>Last login: {new Date(profile.lastLoginAt).toLocaleString()}</span>}
            </div>
          </Col>

          {/* Actions */}
          <Col xs={12} md="auto" className="text-md-end text-center">
            <div className="d-flex gap-2 justify-content-center justify-content-md-end">
              <Button variant="primary">Edit Profile</Button>
              <Button variant="outline-secondary">Change Password</Button>
              {role === 'ADMIN' && (
                <Button variant="outline-danger">
                  <FiShield className="me-1" /> Manage Users
                </Button>
              )}
            </div>
          </Col>
        </Row>
      </Card>
    </div>
  );
}