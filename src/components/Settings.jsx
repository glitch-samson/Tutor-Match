import { User, Bell, Shield, CreditCard, Globe, Moon, Sun, Smartphone, Mail, Lock, Trash2, Save } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useTheme } from './ThemeProvider';
import { settingsAPI } from '../services/api';
import { useApi } from '../hooks/useApi';
import { showAlert } from './CustomAlert';

const Settings = ({ currentUser, onUpdateUser }) => {
  const [settings, setSettings] = useState({
    // Notification settings
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    bookingReminders: true,
    marketingEmails: false,
    
    // Privacy settings
    profileVisibility: 'public',
    showEmail: false,
    showPhone: false,
    allowMessages: true,
    
    // Appearance settings
    language: 'en',
    timezone: 'UTC-5',
    
    // Account settings
    twoFactorAuth: false,
    autoLogout: 30
  });

  const [activeTab, setActiveTab] = useState('notifications');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { theme, setLightTheme, setDarkTheme } = useTheme();
  const { execute } = useApi();

  useEffect(() => {
    // Load settings from API
    const loadSettings = async () => {
      try {
        const response = await execute(() => settingsAPI.getSettings(currentUser.id));
        setSettings(prev => ({ ...prev, ...response.data }));
      } catch (error) {
        console.error('Failed to load settings:', error);
      }
    };

    loadSettings();
  }, [currentUser.id, execute]);

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleThemeChange = (newTheme) => {
    if (newTheme === 'light') {
      setLightTheme();
    } else {
      setDarkTheme();
    }
    handleSettingChange('theme', newTheme);
  };

  const saveSettings = async () => {
    setIsLoading(true);
    try {
      await execute(
        () => settingsAPI.updateSettings(currentUser.id, settings),
        {
          showSuccessAlert: true,
          successMessage: 'Settings saved successfully!'
        }
      );
    } catch (error) {
      console.error('Failed to save settings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAccount = () => {
    // In a real app, this would call an API to delete the account
    localStorage.removeItem(`tutorMatchUser`);
    localStorage.removeItem(`settings_${currentUser.id}`);
    showAlert('success', 'Account deleted successfully');
    window.location.reload();
  };

  const tabs = [
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy', icon: Shield },
    { id: 'appearance', label: 'Appearance', icon: Sun },
    { id: 'account', label: 'Account', icon: User },
    { id: 'billing', label: 'Billing', icon: CreditCard }
  ];

  const ToggleSwitch = ({ enabled, onChange, label, description }) => (
    <div className="flex items-center justify-between py-3">
      <div>
        <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">{label}</h4>
        {description && <p className="text-xs text-gray-500 dark:text-gray-400">{description}</p>}
      </div>
      <button
        onClick={() => onChange(!enabled)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          enabled ? 'bg-primary-500' : 'bg-gray-200 dark:bg-gray-600'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            enabled ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Settings</h1>
        <button
          onClick={saveSettings}
          disabled={isLoading}
          className="btn btn-primary flex items-center"
        >
          {isLoading ? (
            <span>Saving...</span>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <nav className="space-y-1">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <Icon className="h-4 w-4 mr-3" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          <div className="card p-6 dark:bg-gray-800">
            {activeTab === 'notifications' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Notification Preferences</h3>
                <div className="space-y-1">
                  <ToggleSwitch
                    enabled={settings.emailNotifications}
                    onChange={(value) => handleSettingChange('emailNotifications', value)}
                    label="Email Notifications"
                    description="Receive notifications via email"
                  />
                  <ToggleSwitch
                    enabled={settings.pushNotifications}
                    onChange={(value) => handleSettingChange('pushNotifications', value)}
                    label="Push Notifications"
                    description="Receive browser push notifications"
                  />
                  <ToggleSwitch
                    enabled={settings.smsNotifications}
                    onChange={(value) => handleSettingChange('smsNotifications', value)}
                    label="SMS Notifications"
                    description="Receive notifications via text message"
                  />
                  <ToggleSwitch
                    enabled={settings.bookingReminders}
                    onChange={(value) => handleSettingChange('bookingReminders', value)}
                    label="Booking Reminders"
                    description="Get reminded about upcoming lessons"
                  />
                  <ToggleSwitch
                    enabled={settings.marketingEmails}
                    onChange={(value) => handleSettingChange('marketingEmails', value)}
                    label="Marketing Emails"
                    description="Receive promotional emails and updates"
                  />
                </div>
              </div>
            )}

            {activeTab === 'privacy' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Privacy Settings</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Profile Visibility</label>
                    <select
                      value={settings.profileVisibility}
                      onChange={(e) => handleSettingChange('profileVisibility', e.target.value)}
                      className="input dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                    >
                      <option value="public">Public - Anyone can see your profile</option>
                      <option value="registered">Registered Users Only</option>
                      <option value="private">Private - Only you can see your profile</option>
                    </select>
                  </div>
                  
                  <div className="space-y-1">
                    <ToggleSwitch
                      enabled={settings.showEmail}
                      onChange={(value) => handleSettingChange('showEmail', value)}
                      label="Show Email Address"
                      description="Display your email on your public profile"
                    />
                    <ToggleSwitch
                      enabled={settings.showPhone}
                      onChange={(value) => handleSettingChange('showPhone', value)}
                      label="Show Phone Number"
                      description="Display your phone number on your public profile"
                    />
                    <ToggleSwitch
                      enabled={settings.allowMessages}
                      onChange={(value) => handleSettingChange('allowMessages', value)}
                      label="Allow Direct Messages"
                      description="Let other users send you direct messages"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'appearance' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Appearance Settings</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Theme</label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => handleThemeChange('light')}
                        className={`p-3 rounded-lg border-2 transition-all ${
                          theme === 'light'
                            ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                            : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                        }`}
                      >
                        <Sun className="h-5 w-5 mx-auto mb-1 text-gray-700 dark:text-gray-300" />
                        <div className="text-sm font-medium text-gray-700 dark:text-gray-300">Light</div>
                      </button>
                      <button
                        onClick={() => handleThemeChange('dark')}
                        className={`p-3 rounded-lg border-2 transition-all ${
                          theme === 'dark'
                            ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                            : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                        }`}
                      >
                        <Moon className="h-5 w-5 mx-auto mb-1 text-gray-700 dark:text-gray-300" />
                        <div className="text-sm font-medium text-gray-700 dark:text-gray-300">Dark</div>
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Language</label>
                    <select
                      value={settings.language}
                      onChange={(e) => handleSettingChange('language', e.target.value)}
                      className="input dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                    >
                      <option value="en">English</option>
                      <option value="es">Spanish</option>
                      <option value="fr">French</option>
                      <option value="de">German</option>
                      <option value="zh">Chinese</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Timezone</label>
                    <select
                      value={settings.timezone}
                      onChange={(e) => handleSettingChange('timezone', e.target.value)}
                      className="input dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                    >
                      <option value="UTC-8">Pacific Time (UTC-8)</option>
                      <option value="UTC-7">Mountain Time (UTC-7)</option>
                      <option value="UTC-6">Central Time (UTC-6)</option>
                      <option value="UTC-5">Eastern Time (UTC-5)</option>
                      <option value="UTC+0">UTC</option>
                      <option value="UTC+1">Central European Time (UTC+1)</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'account' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Account Security</h3>
                <div className="space-y-4">
                  <div className="space-y-1">
                    <ToggleSwitch
                      enabled={settings.twoFactorAuth}
                      onChange={(value) => handleSettingChange('twoFactorAuth', value)}
                      label="Two-Factor Authentication"
                      description="Add an extra layer of security to your account"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Auto Logout</label>
                    <select
                      value={settings.autoLogout}
                      onChange={(e) => handleSettingChange('autoLogout', parseInt(e.target.value))}
                      className="input dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                    >
                      <option value={15}>15 minutes</option>
                      <option value={30}>30 minutes</option>
                      <option value={60}>1 hour</option>
                      <option value={120}>2 hours</option>
                      <option value={0}>Never</option>
                    </select>
                  </div>

                  <div className="border-t dark:border-gray-700 pt-4">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">Change Password</h4>
                    <button className="btn btn-secondary">
                      <Lock className="h-4 w-4 mr-2" />
                      Update Password
                    </button>
                  </div>

                  <div className="border-t dark:border-gray-700 pt-4">
                    <h4 className="text-sm font-medium text-red-600 dark:text-red-400 mb-2">Danger Zone</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      Once you delete your account, there is no going back. Please be certain.
                    </p>
                    <button
                      onClick={() => setShowDeleteModal(true)}
                      className="btn bg-red-500 text-white hover:bg-red-600"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'billing' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Billing & Payments</h3>
                <div className="space-y-4">
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Current Plan</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Free Plan - No subscription required</p>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Payment Methods</h4>
                    <button className="btn btn-secondary">
                      <CreditCard className="h-4 w-4 mr-2" />
                      Add Payment Method
                    </button>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Billing History</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">No billing history available</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Delete Account Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Delete Account</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Are you absolutely sure you want to delete your account? This action cannot be undone and you will lose all your data.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="btn btn-secondary flex-1"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                className="btn bg-red-500 text-white hover:bg-red-600 flex-1"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;