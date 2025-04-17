import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRequests, approveRequest, rejectRequest } from '../../features/requests/requestSlice';
import '../../styles/manage-requests.css';

const ManageRequestsPage = () => {
    const dispatch = useDispatch();
    const { items: requests, loading } = useSelector(state => state.requests);
    const { user } = useSelector(state => state.auth);

    useEffect(() => {
        dispatch(fetchRequests());
    }, [dispatch]);

    const handleApprove = (requestId) => {
        if (window.confirm('Approve this request?')) {
            dispatch(approveRequest(requestId));
        }
    };

    const handleReject = (requestId) => {
        if (window.confirm('Reject this request?')) {
            dispatch(rejectRequest(requestId));
        }
    };

    return (
        <div className="admin-container">
            <h2>Manage Requests</h2>

            {loading ? (
                <p>Loading requests...</p>
            ) : requests.length > 0 ? (
                <div className="requests-list">
                    {requests.map(request => (
                        <div key={request.id} className="request-card">
                            <div className="request-info">
                                <h3>{request.mangaTitle}</h3>
                                <p>Requested by: User #{request.userId}</p>
                                <p>Status: <span className={`status-${request.status}`}>{request.status}</span></p>
                                <p>Date: {new Date(request.createdAt).toLocaleDateString()}</p>
                            </div>

                            {request.status === 'pending' && (
                                <div className="request-actions">
                                    <button
                                        onClick={() => handleApprove(request.id)}
                                        className="approve-btn"
                                    >
                                        Approve
                                    </button>
                                    <button
                                        onClick={() => handleReject(request.id)}
                                        className="reject-btn"
                                    >
                                        Reject
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <p>No requests found</p>
            )}
        </div>
    );
};

export default ManageRequestsPage;